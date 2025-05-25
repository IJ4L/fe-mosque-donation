import React from "react";
import { DownloadIcon } from "@radix-ui/react-icons";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useMutation } from "../hooks/useMutation";
import MutationItemSkeleton from "@/components/ui/skeletons/MutationItemSkeleton";
import PaginationSkeleton from "@/components/ui/skeletons/PaginationSkeleton";

const Mutation = () => {
  const {
    data,
    isLoading,
    error,
    summaryData,
    isSummaryLoading,
    summaryError,
    currentPage,
    handleNextPage,
    handlePrevPage,
    handlePageChange,
    handleExportExcel,
    renderMutationSkeletons,
    renderPaginationSkeleton,
    calculateSummary,
  } = useMutation();

  const summary = calculateSummary();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-primary-600 border-2 border-black-600 rounded-lg px-6 py-4 shadow-md">
          <p>Pemasukan</p>
          {isSummaryLoading ? (
            <div className="w-full flex justify-end items-end">
              <div className="h-8 bg-primary-500 rounded w-1/2 animate-pulse"></div>
            </div>
          ) : summaryError ? (
            <p className="text-3xl w-full flex justify-end items-end text-red-700">
              Error
            </p>
          ) : (
            <p className="text-3xl w-full flex justify-end items-end">
              {formatCurrency(summary.income)}
            </p>
          )}
        </div>
        <div className="bg-red-400 border-2 border-black-600 rounded-lg px-6 py-4 shadow-md">
          <p>Pengeluaran</p>
          {isSummaryLoading ? (
            <div className="w-full flex justify-end items-end">
              <div className="h-8 bg-red-300 rounded w-1/2 animate-pulse"></div>
            </div>
          ) : summaryError ? (
            <p className="text-3xl w-full flex justify-end items-end text-red-700">
              Error
            </p>
          ) : (
            <p className="text-3xl w-full flex justify-end items-end">
              {formatCurrency(summary.expense)}
            </p>
          )}
        </div>
        <div className="bg-secondary-600 border-2 border-black-600 rounded-lg px-6 py-4 shadow-md">
          <p>Selisih</p>
          {isSummaryLoading ? (
            <div className="w-full flex justify-end items-end">
              <div className="h-8 bg-secondary-500 rounded w-1/2 animate-pulse"></div>
            </div>
          ) : summaryError ? (
            <p className="text-3xl w-full flex justify-end items-end text-red-700">
              Error
            </p>
          ) : (
            <p className="text-3xl w-full flex justify-end items-end">
              {formatCurrency(summary.difference)}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mt-7">
        <div>
          <h1 className="text-xl md:text-3xl font-semibold">Daftar Mutasi</h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Menampilkan riwayat transaksi terbaru
          </p>
        </div>
        <button
          onClick={handleExportExcel}
          className="flex items-center gap-1.5 bg-primary-600 text-black px-2 sm:px-4 md:px-6 hover:bg-primary-700 py-1.5 sm:py-2 rounded-lg border-2 border-black-600 font-semibold text-xs sm:text-sm md:text-md transition duration-300 cursor-pointer"
        >
          <DownloadIcon /> Export
        </button>
      </div>
      <div>
        {isLoading ? (
          renderMutationSkeletons().map((skeleton) => (
            <MutationItemSkeleton key={skeleton.id} />
          ))
        ) : error ? (
          <div className="text-center p-4 bg-red-100 text-red-800 rounded-lg mt-4">
            Error: Gagal memuat data mutasi. Silakan coba lagi nanti.
          </div>
        ) : !data ||
          !data.data ||
          !data.data.mutations ||
          data.data.mutations.length === 0 ? (
          <div className="text-center p-4 bg-gray-100 rounded-lg mt-4">
            Tidak ada mutasi untuk ditampilkan
          </div>
        ) : (
          data.data.mutations.map((mutation) => {
            let bgColor =
              mutation.mutationType === "Income" ? "bg-green-50" : "bg-red-50";
            if (mutation.mutationStatus === "pending") {
              bgColor = "bg-yellow-50";
            }

            let textColor =
              mutation.mutationType === "Income"
                ? "text-green-600"
                : "text-red-600";
            if (mutation.mutationStatus === "pending") {
              textColor = "text-yellow-600";
            }

            return (
              <div
                key={mutation.mutationID}
                className={`flex justify-between ${bgColor} border-2 border-black-600 rounded-lg px-6 py-4 shadow-md mt-4 hover:shadow-lg transition-all`}
              >
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <p className={`font-semibold text-lg ${textColor}`}>
                      {mutation.mutationType === "Income" ? "+ " : "- "}
                      {formatCurrency(mutation.mutationAmount)}
                    </p>
                    {mutation.mutationStatus === "pending" && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-200 text-yellow-800 rounded-full">
                        Pending
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {mutation.mutationDescription}
                  </p>
                </div>
                <div className="flex items-center">
                  <p>{formatDate(mutation.createdAt)}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-0 md:gap-2 mt-4 mb-8">
        {renderPaginationSkeleton().show ? (
          <PaginationSkeleton />
        ) : error ? (
          <div className="text-center p-4">Pagination tidak tersedia</div>
        ) : data?.data?.pagination ? (
          <>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`bg-primary-600 text-black px-6 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 mt-4 ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              Sebelumnya
            </button>
            {data?.data?.pagination &&
              Array.from(
                { length: Math.min(5, data.data.pagination.totalPages) },
                (_, index) => {
                  let pageNum;
                  if (data.data.pagination.totalPages <= 5) {
                    pageNum = index + 1;
                  } else {
                    const halfWay = Math.floor(5 / 2);
                    if (currentPage <= halfWay + 1) {
                      pageNum = index + 1;
                    } else if (
                      currentPage >=
                      data.data.pagination.totalPages - halfWay
                    ) {
                      pageNum = data.data.pagination.totalPages - 5 + index + 1;
                    } else {
                      pageNum = currentPage - halfWay + index;
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handlePageChange(pageNum)}
                      className={`${
                        currentPage === pageNum
                          ? "bg-secondary-700 hover:bg-secondary-600"
                          : "bg-primary-600"
                      } text-black px-6 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer mt-4`}
                    >
                      {pageNum}
                    </button>
                  );
                }
              )}
            <button
              onClick={handleNextPage}
              disabled={
                !data?.data?.pagination ||
                currentPage >= data.data.pagination.totalPages
              }
              className={`bg-primary-600 text-black px-6 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 mt-4 ${
                !data?.data?.pagination ||
                currentPage >= data.data.pagination.totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              Selanjutnya
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Mutation;
