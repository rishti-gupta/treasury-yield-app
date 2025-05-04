import { type OrderResponse } from "../utils";

type OrderListProps = {
  orders: OrderResponse[];
  isLoading: boolean;
  error: string | null;
};

export function OrderList({ orders, isLoading, error }: OrderListProps) {
  if (isLoading)
    return <p className="mt-4 text-center text-gray-500">Loading orders...</p>;
  if (error) return <p className="mt-4 text-center text-red-500">{error}</p>;
  if (!orders.length)
    return <p className="mt-4 text-center text-gray-500">No orders yet.</p>;

  // Sort by createdAt ascending (oldest first)
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  return (
    <div className="mt-6">
      <h2 className="mb-2 text-xl font-semibold">Past Orders</h2>
      <ul className="space-y-2">
        {sortedOrders.map((order) => (
          <li
            key={order.orderId}
            className="rounded bg-gray-100 px-4 py-2 dark:bg-gray-700"
          >
            <div>
              <strong>Term:</strong> {order.term}
            </div>
            <div>
              <strong>Amount:</strong> ${order.amount}
            </div>
            <div>
              <strong>Yield:</strong> {order.yieldRate}%
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Placed on: {new Date(order.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
