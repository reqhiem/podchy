WEB_DIR = ../podchy-web
API_DIR = ../podchy-api

.phony: install
install:
	- cd $(API_DIR) && pip install -r requirements/requirements.txt
	- cd $(WEB_DIR) && npm install

.phony: start
start:
	- docker compose -f docker-compose.yml up -d
	- minikube start

.phony: stop
stop:
	- minikube stop
	- docker compose -f docker-compose.yml stop

.phony: run-api
run-api:
	@ip_address=$$(python -c 'import socket; s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM); s.connect(("8.8.8.8", 80)); print(s.getsockname()[0])'); \
    cd $(API_DIR) && python manage.py runserver $$ip_address:8080

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