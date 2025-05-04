import { useState, useEffect } from "react";
import { createContainer } from "unstated-next";
import { type OrderResponse } from "../utils";
import { OrdersApi } from "../api/orders";

function useOrders() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [isFetchingOrders, setIsFetchingOrders] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setIsFetchingOrders(true);
    try {
      const data = await OrdersApi.getOrders();
      setOrders(data ?? []);
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders");
    } finally {
      setIsFetchingOrders(false);
    }
  };

  useEffect(() => {
    void fetchOrders();
  }, []);

  return {
    orders,
    isFetchingOrders,
    error,
    fetchOrders,
  };
}

export const OrderStore = createContainer(useOrders);
