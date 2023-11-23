import time
import logging
from kubernetes import config
from kubernetes.client import Configuration
from kubernetes.client.api import core_v1_api
from kubernetes.client.rest import ApiException
from kubernetes.stream import stream
from django.conf import settings


class Job:
    def __init__(self, user, cpod, job_name, program) -> None:
        self.user = user
        self.cpod = cpod
        self.job_name = job_name
        self.program = program
        self.executer = None

    def get_upload_commands(self):
        exec_command = [
            "/bin/sh",
            "-c",
            f"echo '{self.program}' > /tmp/{self.cpod}-{self.user}-{self.job_name}",
        ]
        return exec_command

    def get_exec_commands(self):
        pass


class PythonJob(Job):
    def __init__(self, user, cpod, job_name, program) -> None:
        super().__init__(user, cpod, job_name, program)
        self.executer = "python3"

    def get_exec_commands(self):
        exec_commands = [self.executer, f"/tmp/{self.cpod}-{self.user}-{self.job_name}"]
        return exec_commands


class NodeJob(Job):
    def __init__(self, user, cpod, job_name, program) -> None:
        super().__init__(user, cpod, job_name, program)
        self.executer = "node"

    def get_exec_commands(self):
        exec_commands = [self.executer, f"/tmp/{self.cpod}-{self.user}-{self.job_name}"]
        return exec_commands


class CJob(Job):
    def __init__(self, user, cpod, job_name, program) -> None:
        super().__init__(user, cpod, job_name, program)
        self.executer = "gcc"

    def get_exec_commands(self):
        file_name = f"{self.cpod}-{self.user}-{self.job_name}"
        exec_commands = [
            "/bin/sh",
            "-c",
            f"cd /tmp && {self.executer} {file_name} -o {file_name}.out && ./{file_name}.out",
        ]
        return exec_commands


class CPPJob(Job):
    def __init__(self, user, cpod, job_name, program) -> None:
        super().__init__(user, cpod, job_name, program)
        self.executer = "g++"

    def get_exec_commands(self):
        file_name = f"{self.cpod}-{self.user}-{self.job_name}"
        exec_commands = [
            "/bin/sh",
            "-c",
            f"cd /tmp && {self.executer} {file_name} -o {file_name}.out && ./{file_name}.out",
        ]
        return exec_commands


class JobDispatcher:
    def __init__(self) -> None:
        # config.load_kube_config()
        config.load_incluster_config()
        try:
            c = Configuration().get_default_copy()
        except AttributeError:
            c = Configuration()
            c.assert_hostname = False
        Configuration.set_default(c)
        self.kubernetes_api = core_v1_api.CoreV1Api()

    def __launch_pod(self, pod_name):
        logging.info(f"Pod {pod_name} does not exist. Creating it...")
        pod_manifest = {
            "apiVersion": "v1",
            "kind": "Pod",
            "metadata": {"name": pod_name},
            "spec": {
                "containers": [
                    {
                        "name": "podchy-codex",
                        "image": "reqhiem/podchy-codex",
                        "args": ["/bin/sh", "-c", "while true;do date;sleep 5; done"],
                        "resources": {"limits": {"memory": "128Mi", "cpu": "500m"}},
                        "ports": [{"containerPort": 5000}],
                    }
                ]
            },
        }
        resp = self.kubernetes_api.create_namespaced_pod(
            body=pod_manifest, namespace="default"
        )
        while True:
            resp = self.kubernetes_api.read_namespaced_pod(
                name=pod_name, namespace="default"
            )
            if resp.status.phase != "Pending":
                break
            time.sleep(1)
        logging.info("Done.")

    def __run_pod_commands(self, pod_name, commands):
        resp = stream(
            self.kubernetes_api.connect_get_namespaced_pod_exec,
            pod_name,
            "default",
            command=commands,
            stderr=True,
            stdin=False,
            stdout=True,
            tty=False,
        )
        return resp

    def dispatch(self, pod_name, job: Job):
        resp = None
        try:
            resp = self.kubernetes_api.read_namespaced_pod(
                name=pod_name, namespace="default"
            )
        except ApiException as e:
            if e.status != 404:
                logging.error(f"Unknown error: {e}")
                exit(1)

        if not resp:
            self.__launch_pod(pod_name)

        # Uploading user program to pod
        resp = self.__run_pod_commands(pod_name, job.get_upload_commands())
        logging.info(f"Creacion del archivo: {resp}")

        # Running user program
        resp = self.__run_pod_commands(pod_name, job.get_exec_commands())
        return resp
