import React from "react";
import { YieldsStore } from "./store/yield-store";
import { OrderStore } from "./store/order-store";
import { YieldCurveChart } from "./components/YieldCurveChart";
import { OrderForm } from "./components/OrderForm";
import { OrderList } from "./components/OrdersList";
import { userId } from "./utils";
import { ProfileIcon } from "./svgs/profile";

function YieldsView() {
  const { yields, isFetchingYields, error } = YieldsStore.useContainer();
  const {
    orders,
    fetchOrders,
    isFetchingOrders,
    error: orderError,
  } = OrderStore.useContainer();

  return (
    <div className="min-h-screen w-full bg-gray-50 px-4 py-10 dark:bg-gray-900 dark:text-white">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-4 flex items-center gap-3 text-lg font-semibold text-gray-700 dark:text-gray-200">
          <ProfileIcon />
          <span>
            Logged in as{" "}
            <span className="text-blue-700 dark:text-blue-300">{userId}</span>
          </span>
        </div>

        <h1 className="mb-12 text-5xl font-extrabold tracking-tight text-blue-700 dark:text-blue-300">
          Welcome to <span className="text-black dark:text-white">MyBank</span>
        </h1>
      </div>

      <div className="mx-auto w-full max-w-7xl rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
        {isFetchingYields ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading yield data...
          </p>
        ) : error ? (
          <p className="text-center font-medium text-red-500">{error}</p>
        ) : (
          yields.length > 0 && (
            <>
              <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch">
                {/* Chart */}
                <div className="flex w-full flex-col lg:w-1/2">
                  <h2 className="mb-4 text-center text-xl font-semibold text-gray-800 dark:text-gray-200">
                    📈 Treasury Yield Curve
                  </h2>
                  <div className="flex flex-1 items-center justify-center">
                    <YieldCurveChart data={yields} />
                  </div>
                </div>

                {/* Order Form */}
                <div className="flex w-full flex-col lg:w-1/2">
                  <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Place Your Investment Order
                  </h2>
                  <p className="mb-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    Select the term and investment amount based on the curve.
                  </p>
                  <div className="flex flex-1 items-stretch">
                    <div className="flex w-full flex-col justify-center">
                      <OrderForm
                        yields={yields}
                        onOrderSubmitted={fetchOrders}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Orders List */}
              <div className="mt-10">
                <OrderList
                  orders={orders}
                  isLoading={isFetchingOrders}
                  error={orderError}
                />
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <OrderStore.Provider>
      <YieldsStore.Provider>
        <YieldsView />
      </YieldsStore.Provider>
    </OrderStore.Provider>
  );
}

export default App;
