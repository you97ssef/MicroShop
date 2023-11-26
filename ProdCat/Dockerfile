FROM golang

WORKDIR /app
COPY . /app
EXPOSE 80


RUN go mod download


RUN mkdir -p logs \
    && touch logs/app.log \
    && cp environment-docker.json environment.json


RUN go build -o service


ENTRYPOINT [ "/bin/bash", "/app/run-app.sh" ]