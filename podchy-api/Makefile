.phony: start
start:
	- docker compose -f docker-compose.yml up -d
	- minikube start

.phony: stop
stop:
	- minikube stop
	- docker compose -f docker-compose.yml stop

.phony: run
run:
	@ip_address=$$(python -c 'import socket; s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM); s.connect(("8.8.8.8", 80)); print(s.getsockname()[0])'); \
    python manage.py runserver $$ip_address:8080

.phony: makemigrations
makemigrations:
	- python manage.py makemigrations

.phony: migrate
migrate:
	- python manage.py migrate

.phony: createsuperuser
createsuperuser:
	- python manage.py createsuperuser

.phony: shell
shell:
	- python manage.py shell