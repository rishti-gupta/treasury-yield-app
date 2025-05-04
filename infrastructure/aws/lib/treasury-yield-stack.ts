import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as path from 'path';

export class TreasuryYieldStack extends cdk.Stack {
  private readonly restApi: apigw.RestApi;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const restApiName = 'treasury-yields';

    // REST API with CORS support and throttling limits
    this.restApi = new apigw.RestApi(this, 'rest-api', {
      restApiName,
      endpointTypes: [apigw.EndpointType.REGIONAL],
      deploy: true,
      deployOptions: {
        stageName: 'dev',
        throttlingRateLimit: 10,
        throttlingBurstLimit: 25,
        description: 'treasury-yield endpoint',
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowHeaders: apigw.Cors.DEFAULT_HEADERS,
        allowMethods: apigw.Cors.ALL_METHODS,
      },
    });

    // Lambda function that handles API requests
    const lambdaFn = new NodejsFunction(this, 'TreasuryYieldLambda', {
      entry: path.join(
        __dirname,
        '../../../lambdas/src/treasure-yield-api/handler.ts'
      ),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_18_X,
      depsLockFilePath: path.join(
        __dirname,
        '../../../lambdas/package-lock.json'
      ),
      projectRoot: path.join(__dirname, '../../../lambdas'),
      bundling: {
        externalModules: ['@aws-sdk/*'],
        nodeModules: [],
        target: 'node18',
        platform: 'node',
      },
    });

    // Create a DynamoDB table to store order data
    const ordersTable = new dynamodb.Table(this, 'OrdersTable', {
      tableName: 'TreasuryOrders',
      partitionKey: {name: 'orderId', type: dynamodb.AttributeType.STRING},
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // For dev purposes
    });

    // Grant the Lambda function read/write access to the DynamoDB table
    ordersTable.grantReadWriteData(lambdaFn);
    // Pass the table name to the Lambda function via environment variable
    lambdaFn.addEnvironment('ORDERS_TABLE_NAME', ordersTable.tableName);
    // Route all API paths/methods to the Lambda function
    this.addProtectedProxyEndpoint(lambdaFn);
  }
  // Helper method to attach the Lambda function as a proxy integration to the API root
  private addProtectedProxyEndpoint(lambdaFn: lambda.IFunction) {
    this.restApi.root.addProxy({
      defaultIntegration: new apigw.LambdaIntegration(lambdaFn),
      anyMethod: true,
    });
  }
}
