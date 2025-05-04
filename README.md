# Treasury Yield Curve Order App

A full-stack serverless application that allows users to view treasury yield curve data and place investment orders based on the selected term and rate. The application is built with **React**, **AWS Lambda**, **API Gateway**, and **DynamoDB**, and is fully deployable via **AWS CDK**.

---

## High-Level Architecture Diagram

![Architecture Diagram](./docs/architecture-diagram.png)

1. **Frontend (React)** – Displays the yield curve, provides an investment form, and shows past orders.
2. **API Gateway** – Exposes RESTful HTTP endpoints to the frontend.
3. **AWS Lambda** – Handles API requests for yield data and investment orders.
4. **DynamoDB** – Stores submitted orders in a table named `TreasuryOrders`.

---

## Tech Stack

| Layer          | Technology                      |
|----------------| ------------------------------- |
| Frontend       | React + Tailwind CSS            |
| Backend        | AWS Lambda (Node.js)            |
| API Gateway    | AWS API Gateway                 |
| Persistence    | AWS DynamoDB                    |
| Infrastructure | AWS CDK (TypeScript)            |

---

## Getting Started

### Prerequisites

- [Node.js ≥ 18](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [AWS CLI configured](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html)
- CDK v2 installed (`npm install -g aws-cdk`)

---

### Step 1: Deploy the Backend

```bash
cd infrastructure
./dev-deploy.sh

This deploys:
- API Gateway endpoint
- Lambda function with route handlers
- DynamoDB table for storing orders
```

| ✅ Note: Once deployed, the API Gateway endpoint URL will be printed in the terminal output. You’ll need this in the next step.

### Step 2: Set Up Environment Variables
In the project root, create a .env file:

```bash
VITE_API_GATEWAY_URL=https://<your-api-id>.execute-api.<region>.amazonaws.com/dev
```
Replace `<your-api-id>` and `<region>` with the actual values printed after deployment.


### Step 3: Start the Frontend App

```bash
cd ../treasury-yield-app 
npm install
npm run dev
```

Once started, the app will be available at: http://localhost:5173