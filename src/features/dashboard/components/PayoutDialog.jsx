import React from "react";
import { formatCurrency } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const PayoutDialog = ({
  isOpen,
  setIsOpen,
  withdrawableBalance,
  payoutAmount,
  setPayoutAmount,
  payoutDescription,
  setPayoutDescription,
  payoutError,
  payoutSuccess,
  isSubmitting,
  handleSubmit,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="w-full md:w-30 bg-primary-600 text-black px-8 hover:bg-primary-700 py-2 rounded-lg border-2 border-black-600 font-semibold text-sm md:text-md transition duration-300 cursor-pointer">
          Cairkan
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pencairan Dana</DialogTitle>
          <DialogDescription>
            Dana yang tersedia untuk dicairkan:{" "}
            {withdrawableBalance ? formatCurrency(withdrawableBalance) : "Rp 0"}
            <br />
            <span className="text-xs mt-1 block">
              Minimal pencairan: Rp 20.000
            </span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {payoutSuccess && (
            <div className="bg-green-100 text-green-800 p-3 rounded-md text-sm">
              {payoutSuccess}
            </div>
          )}

          {payoutError && (
            <div className="bg-red-100 text-red-800 p-3 mb-2 rounded-md text-sm">
              {payoutError}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Jumlah Pencairan
            </label>
            <input
              id="amount"
              type="number"
              value={payoutAmount}
              onChange={(e) => setPayoutAmount(e.target.value)}
              placeholder="Masukkan jumlah pencairan (min. Rp 20.000)"
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
              min="20000"
              max={withdrawableBalance || 0}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Deskripsi (Opsional)
            </label>
            <textarea
              id="description"
              value={payoutDescription}
              onChange={(e) => setPayoutDescription(e.target.value)}
              placeholder="Contoh: Dana untuk renovasi masjid"
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows="3"
            />
          </div>

          <DialogFooter className="sm:justify-end gap-2">
            <DialogClose asChild>
              <button
                type="button"
                className="cursor-pointer bg-gray-200 text-gray-800 px-4 py-2 rounded-lg border border-gray-300 font-medium hover:bg-gray-300 transition"
              >
                Batal
              </button>
            </DialogClose>
            <button
              type="submit"
              disabled={isSubmitting || !payoutAmount}
              className={`cursor-pointer bg-primary-600 text-black px-4 py-2 rounded-lg border-2 border-black-600 font-medium hover:bg-primary-700 transition ${
                isSubmitting || !payoutAmount
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isSubmitting ? "Memproses..." : "Cairkan Dana"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PayoutDialog;
