import { baseUrl } from "./utils";
import { type OrderRequest, type OrderResponse } from "../utils";

class OrdersApi {
  private readonly baseUrl: string;
  constructor() {
    if (!baseUrl) {
      throw new Error("baseUrl is required");
    }
    this.baseUrl = baseUrl;
  }
  async submitOrder(order: OrderRequest): Promise<void> {
    const url = `${this.baseUrl}/v1/orders`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit order: ${response.status}`);
    }
  }

  async getOrders(): Promise<OrderResponse[]> {
    const url = `${this.baseUrl}/v1/orders`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status}`);
    }
    return response.json();
  }
}

const _ordersApi = new OrdersApi();
export { _ordersApi as OrdersApi };
