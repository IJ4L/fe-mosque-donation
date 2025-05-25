import { useState } from 'react';
import { toast } from "sonner";
import axios from "axios";
import { API_URL } from "@/config/env";
import { formatCurrency } from "@/lib/utils";

/**
 * Custom hook for managing payout form state and submission
 * @param {Function} refetchBalance - Function to refetch balance data after successful payout
 * @returns {Object} Payout form state and handlers
 */
export function usePayoutForm(refetchBalance) {
  const [isPayoutDialogOpen, setIsPayoutDialogOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutDescription, setPayoutDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payoutError, setPayoutError] = useState(null);
  const [payoutSuccess, setPayoutSuccess] = useState(null);

  const handlePayoutSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPayoutError(null);
    setPayoutSuccess(null);

    // Validate minimum amount
    const amount = Number(payoutAmount);
    if (amount < 20000) {
      const errorMsg = "Minimal pencairan dana adalah Rp 20.000";
      setPayoutError(errorMsg);
      toast.error(errorMsg);
      setIsSubmitting(false);
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading(
      "Sedang memproses permintaan pencairan..."
    );

    try {
      const response = await axios.post(`${API_URL}/mutations/payout`, {
        amount: amount,
        description: payoutDescription || "Pencairan dana masjid",
      });

      const successMsg =
        response.data.message || "Permintaan pencairan berhasil dibuat";
      setPayoutSuccess(successMsg);

      // Show success toast and dismiss loading toast
      toast.dismiss(loadingToast);
      toast.success(successMsg, {
        description: `Dana sebesar ${formatCurrency(amount)} akan diproses dengan status pending.`,
      });

      refetchBalance(); // Refresh balance data after successful payout

      // Close dialog after showing success message briefly
      setTimeout(() => {
        setIsPayoutDialogOpen(false);
        setPayoutSuccess(null);
        setPayoutAmount("");
        setPayoutDescription("");
      }, 2000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Terjadi kesalahan. Silakan coba lagi nanti.";

      // Show error toast and dismiss loading toast
      toast.dismiss(loadingToast);
      toast.error("Gagal melakukan pencairan", {
        description: errorMessage,
      });

      setPayoutError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetPayoutForm = () => {
    setPayoutAmount("");
    setPayoutDescription("");
    setPayoutError(null);
    setPayoutSuccess(null);
  };

  return {
    isPayoutDialogOpen, 
    setIsPayoutDialogOpen,
    payoutAmount,
    setPayoutAmount,
    payoutDescription,
    setPayoutDescription,
    isSubmitting,
    payoutError,
    payoutSuccess,
    handlePayoutSubmit,
    resetPayoutForm
  };
}
