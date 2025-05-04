import {API, Request, Response} from 'lambda-api';

export class YieldsRoute {
  routes(): (api: API) => void {
    return (api: API): void => {
      // GET /v1/yields - Returns mock yield curve data.
      // In a real-world implementation, this would fetch data from a live financial API.
      api.get('', (_req: Request, res: Response) => {
        try {
          // Mocked data
          const yields = [
            {term: '1M', rate: 5.12},
            {term: '3M', rate: 4.89},
            {term: '6M', rate: 4.63},
            {term: '1Y', rate: 4.22},
            {term: '2Y', rate: 3.88},
            {term: '5Y', rate: 3.56},
            {term: '10Y', rate: 3.41},
          ];

          return res.status(200).send(yields);
        } catch (error) {
          console.error('Error in YieldsRoute:', error);
          return res.status(500).send({message: 'Failed to fetch yields'});
        }
      });
    };
  }
}
