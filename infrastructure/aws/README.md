# Infrastructure (CDK)

This directory contains AWS CDK code (written in TypeScript) to provision and manage cloud resources for the Treasury Yield Curve Order App.

### Responsibilities:
- Create an API Gateway endpoint to expose REST routes.
- Deploy a Lambda function that serves both yield and order APIs.
- Create a DynamoDB table to store investment orders.
- Wire everything together with correct permissions and environment variables.

### Prerequisites:
- [AWS CLI installed and configured](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html)
  ```bash
  aws configure
  ```
- [Node.js ≥ 18](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [AWS CDK v2](https://docs.aws.amazon.com/cdk/v2/guide/getting-started.html) — install via:
     ```bash
    npm install -g aws-cdk
    ```
- [Docker](https://www.docker.com/) — required for bundling Lambda code


### How to Deploy
```bash
cd infrastructure
npm install
./dev-deploy.sh # Ensure docker is running before executing the script
```

After deployment, the API Gateway URL will be displayed in the terminal. You can copy this into your frontend .env file.