import {API, Request, Response} from 'lambda-api';
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';
import {randomUUID} from 'crypto';

const tableName = process.env.ORDERS_TABLE_NAME!;
const ddbClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

interface OrderRequest {
  term: string;
  amount: number;
  yieldRate: number;
  userId: string;
}

export class OrdersRoute {
  routes(): (api: API) => void {
    return (api: API): void => {
      // GET /v1/orders - List all orders
      api.get('', async (_req: Request, res: Response) => {
        try {
          const result = await ddbClient.send(
            new ScanCommand({TableName: tableName})
          );
          return res.status(200).send(result.Items ?? []);
        } catch (error) {
          console.error('Error fetching orders:', error);
          return res.status(500).send({message: 'Failed to fetch orders'});
        }
      });

      // POST /v1/orders - Submit a new order
      api.post('', async (req: Request, res: Response) => {
        const {term, amount, yieldRate, userId} = req.body as OrderRequest;

        if (!term || !amount || !yieldRate || !userId) {
          return res.status(400).send({message: 'Missing term, amount or yield'});
        }

        const order = {
          orderId: randomUUID(),
          term,
          amount,
          yieldRate,
          userId,
          createdAt: new Date().toISOString(),
        };

        try {
          const result = await ddbClient.send(
            new PutCommand({TableName: tableName, Item: order})
          );
          return res.status(201).send(order);
        } catch (error) {
          console.error('Error submitting order:', error);
          return res.status(500).send({message: 'Failed to submit order'});
        }
      });
    };
  }
}
