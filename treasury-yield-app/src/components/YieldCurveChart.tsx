import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import React from "react";
import { type YieldEntry } from "../utils";

type Props = {
  data: YieldEntry[];
};

export const YieldCurveChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full max-w-screen-md rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold text-gray-800">Yield Curve</h2>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="term" tick={{ fontSize: 12 }} />
            <YAxis
              tickFormatter={(value) => `${value.toFixed(2)}%`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 4, stroke: "#6366f1", fill: "#fff" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
