# Lambdas (Node,js)

This directory contains the source code for the backend logic of the app, written as a Lambda function using Node.js and lambda-api.

### Responsibilities:
- Handle GET and POST requests routed from API Gateway.
- Serve mock treasury yield curve data.
- Read from and write to the DynamoDB `TreasuryOrders` table.

### Structure:
- `src/treasure-yield-api/handler.ts`: Lambda entrypoint using `lambda-api`.
- `routes/v1/yields.ts`: Returns mocked yield curve data.
- `routes/v1/orders.ts`: Handles order submission and retrieval logic.

The Lambda is bundled using `esbuild` during deployment by CDK.

### Note:
This Lambda function is deployed automatically when running the infrastructure CDK stack.
