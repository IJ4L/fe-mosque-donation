import React from "react";
import IcMoney from "@/assets/images/ic_money.svg";
import IcPaid from "@/assets/images/ic_paid.svg";
import { DownloadIcon } from "@radix-ui/react-icons";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils";
import DonationItemSkeleton from "@/components/ui/skeletons/DonationItemSkeleton";
import PaginationSkeleton from "@/components/ui/skeletons/PaginationSkeleton";
import { useDashboard } from "../hooks/useDashboard";

const Dashboard = () => {
  const {
    data,
    isLoading,
    error,
    currentPage,
    handleNextPage,
    handlePrevPage,
    handlePageChange,
    handleExportExcel,
  } = useDashboard();

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center px-4 md:px-12 gap-3 w-full md:w-1/2 py-4 md:py-2 bg-primary-600 border-2 border-black-600 rounded-lg">
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="font-regular text-4xl text-center md:text-start">
              Rp 536.000
            </div>
            <div className="text-center md:text-start">
              Angka di atas adalah total saldo kamu. Setiap transaksi harus
              menunggu 3 hari untuk bisa dicairkan.
            </div>
          </div>
          <img
            className="hidden md:flex size-24 xl:size-36"
            src={IcMoney}
            alt=""
          />
        </div>
        <div className="flex items-center justify-center px-12 gap-3 w-full md:w-1/2 py-6 bg-secondary-700 border-2 border-black-600 rounded-lg">
          <div className="flex flex-col gap-4">
            <div className="font-regular text-4xl">Rp 536.000</div>
            <div className="text-center md:text-start">
              Setiap transaksi harus menunggu 3 hari untuk bisa dicairkan.
            </div>
            <button className="w-full md:w-30 bg-primary-600 text-black px-8 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer">
              Cairkan
            </button>
          </div>
          <img
            className="hidden md:flex size-24 xl:size-36"
            src={IcPaid}
            alt=""
          />
        </div>
      </div>{" "}
      <div className="mt-8 mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-3xl">Daftar Donasi</h1>
          <button
            onClick={handleExportExcel}
            className="flex items-center w-30 bg-primary-600 text-black px-8 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer"
          >
            <DownloadIcon className="mr-2" /> Export
          </button>
        </div>{" "}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {isLoading ? (
            Array.from({ length: 6 }, (_, index) => (
              <DonationItemSkeleton key={index} />
            ))
          ) : error ? (
            <div className="col-span-full text-center p-4 bg-red-100 text-red-800 rounded-lg">
              Error: Gagal memuat data donasi. Silakan coba lagi nanti.
            </div>
          ) : !data ||
            !data.data ||
            !data.data.donations ||
            data.data.donations.length === 0 ? (
            <div className="col-span-full text-center p-4 bg-gray-100 rounded-lg">
              Tidak ada donasi untuk ditampilkan
            </div>
          ) : (
            data.data.donations.map((donation) => (
              <div
                key={donation.donationID}
                className="flex justify-between bg-gray-100 border-2 border-black-600 rounded-lg p-4"
              >
                <div>
                  <p>Donasi</p>
                  <h5 className="text-2xl xl:text-3xl 2xl:text-5xl">
                    {formatCurrency(donation.donationAmount).replace("Rp", "")}
                  </h5>
                  <p className="text-red-500 text-sm">
                    -{" "}
                    {formatCurrency(donation.donationDeduction).replace(
                      "Rp",
                      ""
                    )}
                  </p>
                  <p className="text-sm mt-3">
                    {formatDate(donation.createdAt)}
                  </p>
                  <p className="text-sm">{formatTime(donation.createdAt)}</p>
                </div>
                <div>
                  <h5 className="font-medium">{donation.donaturName}</h5>
                  <h5 className="text-sm">{donation.donaturEmail}</h5>
                  <h5>"{donation.donaturMessage || "Tidak ada pesan"}"</h5>
                </div>
              </div>
            ))
          )}{" "}
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-0 md:gap-2 mt-4">
          {isLoading ? (
            <PaginationSkeleton />
          ) : error ? (
            <div className="text-center p-4">Pagination tidak tersedia</div>
          ) : (
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
                    // Show pages around current page
                    let pageNum;
                    if (data.data.pagination.totalPages <= 5) {
                      pageNum = index + 1;
                    } else {
                      // Calculate which pages to show when we have more than 5
                      const halfWay = Math.floor(5 / 2);
                      if (currentPage <= halfWay + 1) {
                        pageNum = index + 1;
                      } else if (
                        currentPage >=
                        data.data.pagination.totalPages - halfWay
                      ) {
                        pageNum =
                          data.data.pagination.totalPages - 5 + index + 1;
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
                            ? "bg-primary-600"
                            : "bg-secondary-700 hover:bg-secondary-600"
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
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
