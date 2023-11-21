# Podchy: Code as a Service project

This repository contains a full-stack application developed using Django Rest Framework for the backend and React TypeScript (with Vite) for the frontend. The goal of this application is to provide a system similar to Replit, where users can register, login, create, share, and delete workspaces known as "Cpods." Within a Cpod, users can add files for coding in an online editor, which supports live collaboration. Additionally, users can execute the code by clicking the "Run" button. The code execution takes place in a Kubernetes cluster's pod, and the results are displayed in a dedicated "console" section.

## Features

- User Authentication: Users can register and login securely.

- Workspace Management: Users can create, share, and delete Cpods (workspaces).

- Online Editor: Users can add and edit files within Cpods using an online editor.

- Live Collaborative Editing: Supports real-time collaboration within the editor.

- Code Execution: Users can execute the code within Cpods, utilizing a Kubernetes cluster's pod for execution.

- Console Display: Results of the code execution are displayed in a dedicated console section.


## Installation

### Requirements

- minikube v1.32.0
- kubectl v1.28
- node >= v16
- python 3.9.x
- docker compose v2.21

### 1. (Optional) Creating Python virtual environment

The are two options for complete this task.

-  **With conda (anaconda or miniconda)**
    
    1. First create a conda env with the command:
    `conda create --name podchy-env python=3.9`
    
    2. Then activate the env: `conda activate podchy-env` (activate this in every terminal instance where you run the backend service) 

-  **With `venv` module**

    1. Execute the command `python3 -m venv podchy-env`

    2. Activate the env with `source podchy-env/bin/activate` (activate the env in every terminal instance where you want run the backend service)

If you don't want use a virtual Python environment be careful with modules conflicts.

### 2. Dependencies installation

1. Move to `installation` directory with: `cd installation` command

2. Then run `make install`

This will install backend and frontend requirements, if you have some issues, make sure python env is correctly configured.

### 3. Run necesary resources.

1. In the installation folder run: `make resources`

### 4. Run the backend service.

1. In the installation folder run: `make run-api`

2. (Only first time) For apply the Django migrations run: `make migrate`. Optionally you cand create a superuser account with `make createsuperuser`.

### 5. Run the frontend service

1. (In another terminal instance) In the installation folder run: `make run-web`

2. Then visit: [http://localhost:3002](http://localhost:3002) in any browser.


### 6. For stop services (after app using)

1. Run `make stop` to stop the database service and minikube.

### Backend

- Django Rest Framework
- Django
- Kubernetes

### Frontend

- React
- TypeScript
- Vite

## Usage

1. Access the application through the provided URL after starting both the backend and frontend servers.
2. Register or log in to your account.
3. Create a new Cpod/workspace or access existing ones.
4. Add files for coding and utilize the online editor for real-time collaboration.
5. Click the "Run" button to execute the code in a Kubernetes cluster's pod.
6. View the results in the dedicated console section.

##  Acknowledgements

Thanks to contribuitors.