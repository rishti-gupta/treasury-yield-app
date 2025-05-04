// lambdas/handler.ts
import {APIGatewayProxyEvent, Context} from 'aws-lambda';
import createAPI, {Request, Response, NextFunction} from 'lambda-api';
import {YieldsRoute} from './routes/v1/yields';
import {OrdersRoute} from './routes/v1/orders';

const api = createAPI({
  logger: true,
});

api.use((req: Request, res: Response, next: NextFunction) => {
  res.cors({});
  next();
});

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // send back cors even when there are errors
  res.cors({});
  next();
};

api.use(errorHandler);

const yieldsRoute = new YieldsRoute();
const ordersRoute = new OrdersRoute();

api.register(yieldsRoute.routes(), {prefix: '/v1/yields'});
api.register(ordersRoute.routes(), {prefix: '/v1/orders'});

export const handler = (event: APIGatewayProxyEvent, context: Context) => {
  return api.run(event, context);
};
