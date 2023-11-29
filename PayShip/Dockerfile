FROM node

WORKDIR /app
COPY . /app
EXPOSE 80

ENV NODE_ENV=production
ENV PORT=80
RUN npm install

ENTRYPOINT [ "/bin/bash", "/app/run-app.sh" ]
