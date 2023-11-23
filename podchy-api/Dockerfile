FROM python:3.9.18-slim

COPY . /app
WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install -r requirements/requirements.txt

EXPOSE 8000