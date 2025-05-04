# Frontend React App

This directory contains the React-based user interface for the Treasury Yield Curve Order App.

### Responsibilities:
- Display the current U.S. Treasury yield curve as a chart.
- Allow users to input an investment term and amount.
- Submit investment orders to the backend.
- Display past orders stored in DynamoDB.

The app is styled using Tailwind CSS and interacts with the backend via a REST API exposed by AWS API Gateway.

### How to Run
```bash
npm install
cp .env.example .env  # Fill in your deployed API Gateway URL
npm run dev
```

The app will be available at http://localhost:5173
