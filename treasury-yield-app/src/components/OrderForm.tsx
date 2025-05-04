import React, { useState } from "react";
import { OrdersApi } from "../api/orders";
import { type OrderRequest, userId, type YieldEntry } from "../utils";

type OrderFormProps = {
  yields: YieldEntry[];
  onOrderSubmitted: () => void;
};

export function OrderForm(props: OrderFormProps) {
  const [term, setTerm] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedRate = props.yields.find((y) => y.term === term)?.rate;

    if (!term || amount === "" || selectedRate == null) {
      alert("Please fill out all fields properly.");
      return;
    }

    try {
      setSubmitting(true);
      const order: OrderRequest = {
        term: term,
        amount: Number(amount),
        yieldRate: selectedRate,
        userId: userId,
      };
      await OrdersApi.submitOrder(order);
      setMessage("Order submitted successfully!");
      setTerm("");
      setAmount("");
      props.onOrderSubmitted();

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error submitting order:", error);
      setMessage("Failed to submit order.");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 flex flex-col gap-4 rounded-xl bg-gray-100 p-4 dark:bg-gray-700"
    >
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Select Term</label>
        <select
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2 text-gray-700"
          required
        >
          <option value="">-- Choose Term --</option>
          {["1M", "3M", "6M", "1Y", "2Y", "5Y", "10Y"].map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium">Investment Amount ($)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="rounded px-3 py-2 text-gray-700"
          required
          min={1}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Submit Order"}
      </button>

      {message && <p className="text-center text-sm">{message}</p>}
    </form>
  );
}
