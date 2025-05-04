export type YieldEntry = {
  term: string;
  rate: number;
};

export interface OrderRequest {
  term: string;
  amount: number;
  yieldRate: number;
  userId: string;
}

export interface OrderResponse {
  orderId: string;
  term: string;
  amount: number;
  yieldRate: number;
  userId: string;
  createdAt: Date;
}

export const userId = import.meta.env.VITE_USER_ID ?? "User123";
