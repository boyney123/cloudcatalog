---
name: NextJS Application
description: NextJS Application for the users dashboards
AWS:
  Arn: >-
    arn:aws:apprunner:us-west-2:123456789123:service/next-app/85bf138c24cc4cbea8d2dd4cdfd7819f
  Account: '123456789123'
  Service: apprunner
catalog:
  updatedAt: '2024-01-19T06:22:21.245Z'
  parent: apprunner
  path: user-nextjs-application
  generic: true
service: user-service
owners:
  - dboyne
  - user team
---


## About this NextJS Application

This documentation is intended to provide a comprehensive guide to deploying, managing, and understanding the NextJS application that powers our User Dashboard. The dashboard is designed to provide a seamless user interface, allowing users to interact with our core services efficiently. The application is hosted on AWS App Runner for high availability and scalable performance.

### Architecture overview

The User Dashboard is a NextJS application, which is a React framework capable of server-side rendering. The application is containerized and deployed on AWS App Runner, a fully managed service that provides automatic scaling, security, and monitoring.

#### Key Components:

- NextJS Application: The core of the user interface, written in React with server-side rendering.
- AWS App Runner: Manages the deployment, scaling, and operations of the NextJS application.
- Data Sources: APIs or databases that the NextJS application interacts with.


#### Prerequisites

Before working with the User Dashboard, ensure that you have the following:

- AWS Account with appropriate permissions.
- Knowledge of NextJS and React.
- Basic understanding of containerization and AWS App Runner.

**1. Clone the repo**

```sh
git clone git@github.com:boyney123/eventcatalog.git
cd eventcatalog
```

**2. Install dependencies**
```sh
npm install
```

**3. Run the application locally**
```sh
npm run dev
```


## Deployment Process

The application is containerized and deployed on AWS App Runner. Follow these steps to deploy or update the application:

1. **Build the Docker Image:**
   - Ensure you have a `Dockerfile` in your project root.
   - Build your container image:
     ```sh
     docker build -t user-dashboard .
     ```

2. **Push the Image to a Registry (e.g., Amazon ECR):**
   - Tag your image:
     ```sh
     docker tag user-dashboard:latest [aws_account_id].dkr.ecr.[region].amazonaws.com/user-dashboard:latest
     ```
   - Push your image:
     ```sh
     docker push [aws_account_id].dkr.ecr.[region].amazonaws.com/user-dashboard:latest
     ```

3. **Deploy on AWS App Runner:**
   - Navigate to the AWS App Runner console.
   - Create a new service or update an existing service.
   - Choose the container image you pushed as the source.
   - Configure the service (CPU, memory, environment variables).
   - Deploy the service.

## Best Practices

- **Environment Variables:** Keep sensitive information and configuration settings in environment variables.
- **Logging and Monitoring:** Utilize AWS CloudWatch for logging and monitoring the application's performance and health.
- **Security:** Regularly update dependencies to the latest version to avoid vulnerabilities. Implement necessary security groups and access roles in AWS.

## Troubleshooting

- **Application Errors:** Check the application logs in AWS CloudWatch for any runtime errors or warnings.
- **Deployment Issues:** Ensure that the Docker image is built and pushed correctly. Verify the configurations in AWS App Runner.
- **Performance Problems:** Monitor the metrics in AWS CloudWatch. Consider scaling policies and optimize your application code.

## Conclusion

The User Dashboard is a critical component of our service architecture, providing a user-friendly interface for interacting with our services. By following the guidelines and processes outlined in this documentation, you can ensure a smooth operation and maintenance of the application on AWS App Runner.

---



    