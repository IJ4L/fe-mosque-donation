import React from "react";
import { EyeOpenIcon, DownloadIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useDonationsAdmin } from "../hooks/useDonationsAdmin";
import DonationItemSkeleton from "@/components/ui/skeletons/DonationItemSkeleton";
import PaginationSkeleton from "@/components/ui/skeletons/PaginationSkeleton";
import { useDonationById } from "../api/get-donations";
import { formatCurrency } from "@/lib/utils";

const DonationsAdmin = () => {
  const {
    data,
    isLoading,
    error,
    currentPage,
    openDetailSheet,
    viewingDonationId,
    setOpenDetailSheet,
    handleNextPage,
    handlePrevPage,
    handlePageChange,
    handleViewClick,
    handleExportExcel,
    formatDate,
    getPaymentMethod,
  } = useDonationsAdmin();

  const { data: viewingDonation } = useDonationById(viewingDonationId);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Daftar Donasi</h2>
        <button
          onClick={handleExportExcel}
          className="flex items-center bg-primary-600 hover:bg-primary-700 text-black px-4 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition duration-300 cursor-pointer"
        >
          <DownloadIcon className="mr-2" /> Export Excel
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col space-y-4">
          <DonationItemSkeleton />
          <DonationItemSkeleton />
          <DonationItemSkeleton />
          <DonationItemSkeleton />
          <DonationItemSkeleton />
          <PaginationSkeleton />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-40">
          <p>Error: {error.message}</p>
        </div>
      ) : !data ||
        !data.data ||
        !data.data.donations ||
        data.data.donations.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <p>Tidak ada donasi untuk ditampilkan</p>
        </div>
      ) : (
        <>
          {data.data.donations.map((donation) => (
            <div
              key={donation.donationID}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white mb-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col flex-grow mr-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">
                    {donation.donaturName}
                  </h3>
                  <span className="text-green-600 font-bold">
                    {formatCurrency(donation.donationAmount)}
                  </span>
                </div>
                <span className="text-gray-600">{donation.donaturEmail}</span>
                <p className="text-gray-700 mt-2 line-clamp-2">
                  {donation.donaturMessage || "-"}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-500 text-sm">
                    {formatDate(donation.createdAt)}
                  </span>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {getPaymentMethod(donation.donationType)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleViewClick(donation.donationID)}
                className="flex items-center justify-center size-12 border-2 border-black-600 bg-primary-600 rounded-lg hover:bg-primary-700 cursor-pointer transform transition-transform hover:scale-105 active:scale-95"
              >
                <EyeOpenIcon className="size-5" />
              </button>
            </div>
          ))}

          {/* Pagination */}
          {data.data.pagination && data.data.pagination.totalPages > 1 && (
            <div className="flex flex-col md:flex-row justify-center gap-0 md:gap-2 mb-6">
              <button
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
                className={`bg-primary-600 text-black px-6 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition-all duration-300 mt-4 hover:shadow-md transform hover:-translate-y-1 ${
                  currentPage <= 1
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                Sebelumnya
              </button>

              {Array.from(
                { length: data.data.pagination.totalPages },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`text-black px-6 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition-all duration-300 mt-4 hover:shadow-md transform hover:-translate-y-1 ${
                      currentPage === index + 1
                        ? "bg-secondary-700 hover:bg-secondary-600"
                        : "bg-primary-600 hover:bg-primary-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}

              <button
                onClick={handleNextPage}
                disabled={currentPage >= data.data.pagination.totalPages}
                className={`bg-primary-600 text-black px-6 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-md transition-all duration-300 mt-4 hover:shadow-md transform hover:-translate-y-1 ${
                  currentPage >= data.data.pagination.totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                Selanjutnya
              </button>
            </div>
          )}
        </>
      )}

      {/* Detail View Sheet */}
      <Sheet open={openDetailSheet} onOpenChange={setOpenDetailSheet}>
        <SheetContent className="bg-white h-screen" side={"bottom"}>
          <SheetHeader className="h-1/5 flex justify-center items-center">
            <SheetTitle
              className="font-semibold text-2xl animate-fadeIn"
              style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
            >
              Detail Donasi
            </SheetTitle>
            <SheetDescription
              className="animate-fadeIn"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              Informasi lengkap tentang donasi
            </SheetDescription>
          </SheetHeader>
          {viewingDonation && viewingDonation.data && (
            <div
              className="flex flex-col items-center h-full w-full bg-black-600 rounded-t-4xl p-6 animate-scaleIn"
              style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
            >
              <div
                className="bg-white rounded-lg p-6 shadow-xl w-full max-w-3xl animate-fadeIn"
                style={{
                  animationDelay: "500ms",
                  animationFillMode: "forwards",
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-gray-500 font-medium mb-1">
                      Nama Donatur
                    </h3>
                    <p className="text-black font-semibold text-lg">
                      {viewingDonation.data.donaturName}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-gray-500 font-medium mb-1">Email</h3>
                    <p className="text-black font-semibold">
                      {viewingDonation.data.donaturEmail}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-gray-500 font-medium mb-1">
                      Jumlah Donasi
                    </h3>
                    <p className="text-green-600 font-bold text-2xl">
                      {formatCurrency(viewingDonation.data.donationAmount)}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-gray-500 font-medium mb-1">
                      Metode Pembayaran
                    </h3>
                    <p className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                      {getPaymentMethod(viewingDonation.data.donationType)}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-gray-500 font-medium mb-1">
                      Tanggal Donasi
                    </h3>
                    <p className="text-black">
                      {formatDate(viewingDonation.data.createdAt)}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-gray-500 font-medium mb-1">
                      Biaya Layanan
                    </h3>
                    <p className="text-black">
                      {formatCurrency(viewingDonation.data.donationDeduction)}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="text-gray-500 font-medium mb-1">Pesan</h3>
                    <p className="text-black p-3 bg-gray-50 rounded-lg">
                      {viewingDonation.data.donaturMessage || "Tidak ada pesan"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DonationsAdmin;
