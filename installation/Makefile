include ../podchy-api/.env

WEB_DIR = ../podchy-web
API_DIR = ../podchy-api
ARTIFACT_REGISTRY_REPOSITORY = us-central1-docker.pkg.dev/podchy-project/podchy
DH_REGISTRY_REPOSITORY = reqhiem
IP_ADDRESS = $$(python -c 'import socket; s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM); s.connect(("8.8.8.8", 80)); print(s.getsockname()[0])')

.phony: install
install:
	- cd $(API_DIR) && pip install -r requirements/requirements.txt
	- cd $(WEB_DIR) && npm install

.phony: start
start:
	- minikube start
	- docker compose -f docker-compose.yml up -d

.phony: build-api
build-api:
	- cd $(API_DIR) && docker build . -t $(DH_REGISTRY_REPOSITORY)/podchy-api:latest
	
.phony: upload-api
upload-api:
	- docker push $(DH_REGISTRY_REPOSITORY)/podchy-api:latest
	
.phony: build-web
build-web:
	- cd $(WEB_DIR) && docker build . -t $(ARTIFACT_REGISTRY_REPOSITORY)/podchy-web:latest

.phony: upload-web
upload-web:
	- docker push $(ARTIFACT_REGISTRY_REPOSITORY)/podchy-web:latest

.phony: secrets
secrets:
	- kubectl create secret generic podchy-api-secret --from-env-file=$(API_DIR)/.env

.phony: delete-secrets
delete-secrets:
	- kubectl delete secret podchy-api-secret

.phony: update-ip
update-api:
	

.phony: images-api
images-api: build-api upload-api

.phony: images-web
images-web: build-web upload-web

.phony: deploy-api
deploy-api:
	- kubectl apply -f k8s/api-deploy.yml

.phony: deploy-web
deploy-web:
	- kubectl apply -f k8s/web-deploy.yml

.phony: deploy
deploy: deploy-api deploy-web

.phony: uninstall-api
uninstall-api:
	- kubectl delete -f k8s/api-deploy.yml

.phony: uninstall-web
uninstall-web:
	- kubectl delete -f k8s/web-deploy.yml

.phony: uninstall
uninstall: uninstall-api uninstall-web

.phony: stop
stop:
	- minikube stop
	- docker compose -f docker-compose.yml stop

.phony: run-api
run-api:
	@ip_address=$$(python -c 'import socket; s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM); s.connect(("8.8.8.8", 80)); print(s.getsockname()[0])'); \
    cd $(API_DIR) && python manage.py runserver $$ip_address:8000

.phony: run-web
run-web:
	- cd $(WEB_DIR) && npm run dev

.phony: makemigrations
makemigrations:
	- cd $(API_DIR) python manage.py makemigrations

.phony: migrate
migrate:
	- cd $(API_DIR) && python manage.py migrate

.phony: createsuperuser
createsuperuser:
	- cd $(API_DIR) python manage.py createsuperuser

.phony: shell
shell:
	- cd $(API_DIR) python manage.py shell