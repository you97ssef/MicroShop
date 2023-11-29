# MicroShop

This is a project that is designed on a microservices architecture, built on different languages and frameworks and can run on docker containers using custom docker images and Docker Compose. These microservices are interconnected to each other via a gateway, each serving specific functionalities and domains. The microservices included in this repository are:

-   **DataVortex**: PostgreSQL provider with the capability to pre-create databases.
-   **UserVerse**: User management API REST microservice responsible for user authentication and authorization. Developed using PHP and Lumen.
-   **ProdCat**: Product catalog API REST microservice handling product and category management, as well as search and filtering functionalities. Built using Golang and Gin with a custom architecture.
-   **OrderPro**: Order processing API REST microservice managing order-related tasks and processing. Developed using C# and .NET Core.
-   **PayShip**: Payment and shipping API REST microservice overseeing payment and shipping management and processing. Developed using Node.js and Express.
-   **Gatekepper**: Gateway API REST microservice managing routing and interconnection between the microservices. Developed using Node.js with TypeScript and Nest.js.

![Microshop](https://github.com/you97ssef/MicroShop/assets/46852751/ab6a11ee-d0cf-4dda-9c57-132fb7182f15)


## Prerequisites

Before running these microservices, ensure that you have Docker and Docker Compose installed on your machine. Alternatively, you can refer to the readme file of each microservice for specific instructions on how to run it.

## Running the Microservices

To run this project microservices, follow these steps:

1.  Clone this repository to your local machine.
2.  Open a terminal and navigate to the root directory of the repository.
3.  Run the following command to start the microservices:

    ```
    docker-compose up
    ```

    This will start the microservices.

4.  Once the microservices are running, you can access the infrastructure gateway using the following URL:

    ```
    http://localhost:8000
    ```

## Controlling the Microservices

To control the microservices, you can use the following commands:

```bash
# Start the microservices in the background
docker-compose up -d

# Stop the microservices
docker-compose stop

# Start the microservices
docker-compose start

# Stop and remove the microservices
docker-compose down

# Stop and remove the microservices, as well as all their dependencies
docker-compose down --rmi all --volumes --remove-orphans
```

## Documentation

you'll find a postman collection file **Microshop.postman_collection.json** in the root directory of this repository. This file contains all the API endpoints of the microservices, as well as the required parameters to the gateway of the application.

You can also find the documentation of the infrastructure in the following link:

[MicroShop Documentation](https://documenter.getpostman.com/view/13996413/2s9YeEcsJi)

## License

This code is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
