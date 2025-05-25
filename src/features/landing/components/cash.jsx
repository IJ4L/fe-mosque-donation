// filepath: f:\web\fe-mosque-donation\src\features\landing\components\cash.jsx
import React from "react";
import { useCashSummary } from "../hooks/useCashSummary";

const Kas = () => {
  const { data, monthName, isLoading, error, handleRetryFetch } =
    useCashSummary();

  return (
    <section
      id="kas-masjid"
      className="mt-8 mb-8 md:mb-0 md:mt-18 xl:mt-20 2xl:mt-24 mx-8 md:mx-20 xl:mx-40 2xl:mx-64"
    >
      {error ? (
        <div className="h-60 flex items-center justify-center">
          <div className="bg-red-50 text-red-800 p-4 rounded-lg text-center">
            <p>Gagal memuat data keuangan.</p>
            <button
              onClick={handleRetryFetch}
              className="mt-2 text-sm underline hover:text-red-600"
            >
              Coba lagi
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row h-60 justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col justify-center items-center space-y-2 w-full py-5 md:py-10 border-2 border-gray-200/30 rounded-xl">
            <p className="text-sm">Pemasukan {monthName}</p>
            {isLoading ? (
              <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
            ) : (
              <h2 className="font-semibold md:text-xl xl:text-2xl 2xl:text-3xl">
                {data.income}
              </h2>
            )}
          </div>

          <div className="flex flex-col justify-center items-center space-y-2 w-full py-5 md:py-10 bg-primary-700 rounded-xl">
            <p className="text-sm text-white">Saldo {monthName}</p>
            {isLoading ? (
              <div className="h-8 w-32 bg-primary-600 animate-pulse rounded"></div>
            ) : (
              <h2 className="font-semibold md:text-xl xl:text-2xl 2xl:text-3xl text-white">
                {data.balance}
              </h2>
            )}
          </div>

          <div className="flex flex-col justify-center items-center space-y-2 w-full py-5 md:py-10 border-2 border-gray-200/30 rounded-xl">
            <p className="text-sm">Pengeluaran {monthName}</p>
            {isLoading ? (
              <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
            ) : (
              <h2 className="font-semibold md:text-xl xl:text-2xl 2xl:text-3xl">
                {data.expense}
              </h2>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Kas;

