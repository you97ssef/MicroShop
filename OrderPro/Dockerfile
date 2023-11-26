FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /app
COPY . ./

RUN mv appsettings.Docker.json appsettings.json

RUN dotnet restore
RUN dotnet publish -c release -o out

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /service
COPY --from=build /app/out .
COPY --from=build /app/run-app.sh .

ENTRYPOINT [ "/bin/bash", "/service/run-app.sh" ]