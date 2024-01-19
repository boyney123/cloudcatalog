---
name: NextJS Application
description: Payment dashboards
AWS:
  Arn: >-
    arn:aws:apprunner:us-west-2:123456789123:service/payment-nextjs-app/a0b4839c972747c0befbd0ed2ee178cb
  Account: '123456789123'
  Service: apprunner
catalog:
  updatedAt: '2024-01-19T06:25:34.819Z'
  parent: apprunner
  path: payment-nextjs-application
  generic: true
service: payment-service
owners:
  - payment-team
  - mSmith
---


## Introduction

This documentation aims to provide a detailed guide for the deployment, management, and usage of the NextJS Payment Dashboard Application. This application serves as a comprehensive platform for displaying various payment-related dashboards, ensuring seamless and efficient payment operations. The application leverages the scalability and reliability of AWS App Runner for hosting.

## Architecture Overview

The Payment Dashboard is built on NextJS, a robust framework for React applications that supports features like server-side rendering. The application is containerized and hosted on AWS App Runner, ensuring automatic scaling, security, and hassle-free management.

**Key Components:**
- **NextJS Application:** Serves the frontend, providing a rich, interactive user interface for payment dashboards.
- **AWS App Runner:** Manages the deployment, auto-scaling, and operations of the containerized NextJS application.
- **Data Sources:** Integrates with payment gateways and databases to fetch real-time payment data.

## Prerequisites

Before you begin, ensure you have the following:
- An AWS account with necessary permissions.
- Familiarity with NextJS, React, and containerization concepts.
- Understanding of AWS App Runner for deployment.

## Local Development Setup

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
   Ensure your project root has a `Dockerfile`. Build the container image using the command:
   ```sh
   docker build -t payment-dashboard .
   ```

2. **Push the Image to a Registry (e.g., Amazon ECR):**
   First, tag your image to prepare it for pushing to your registry like Amazon ECR. Replace `[aws_account_id]`, `[region]`, and `[repository-name]` with your specific details. Tag and push the image using the commands:
   ```sh
   docker tag payment-dashboard:latest [aws_account_id].dkr.ecr.[region].amazonaws.com/[repository-name]:latest
   docker push [aws_account_id].dkr.ecr.[region].amazonaws.com/[repository-name]:latest
   ```

3. **Deploy on AWS App Runner:**
   - Navigate to the AWS App Runner console.
   - Create a new service or update an existing service.
   - Choose the container image you pushed as the source.
   - Configure the service settings like CPU, memory, and environment variables.
   - Deploy the service by finalizing the settings.

## Best Practices

- **Environment Variables:** Securely manage configuration and sensitive data using environment variables.
- **Logging and Monitoring:** Set up AWS CloudWatch for comprehensive logging and real-time monitoring of the application's performance.
- **Security:** Keep dependencies updated and configure AWS security groups and IAM roles correctly for secure operation.

## Troubleshooting

- **Application Errors:** Check AWS CloudWatch logs for runtime errors or issues.
- **Deployment Issues:** Ensure the Docker image is correctly built and pushed. Confirm the AWS App Runner configurations.
- **Performance Problems:** Analyze AWS CloudWatch metrics, consider adjusting scaling policies, and optimize your application code where necessary.

## Conclusion

The Payment Dashboard Application is a pivotal component of our financial infrastructure, offering detailed insights and management of payment operations. Adhering to this guide will facilitate smooth deployment and maintenance of the application on AWS App Runner.

    