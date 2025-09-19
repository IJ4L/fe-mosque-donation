import { useState, useRef } from "react";
import donationsApi, { useDonationSubmit } from "../api/donations.jsx";

/**
 * Custom hook for managing donation form state and submission
 * @returns {Object} Donation form state and handlers
 */
export const useDonationForm = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorNumber, setDonorNumber] = useState("");
  const [donationMessage, setDonationMessage] = useState("");
  const [error, setError] = useState(null);
  const [successInfo, setSuccessInfo] = useState(null);
  const formRef = useRef(null);

  const donationMutation = useDonationSubmit();
  const isSubmitting = donationMutation.isPending;

  const resetForm = () => {
    setDonationAmount("");
    setDonorName("");
    setDonorNumber("");
    setDonationMessage("");
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!donationAmount || Number(donationAmount) < 1000) {
      setError("Donasi minimum adalah Rp 1.000");
      return;
    }

    setError(null);

    try {
      const donationData = {
        donationAmount: Number(donationAmount),
        donationDeduction: 1,
        donationType: 1,
        donaturName: donorName,
        donaturNumber: donorNumber,
        donaturMessage: donationMessage || "",
      };

      const response = await donationMutation.mutateAsync(donationData);

      if (response.data && response.data.redirect) {
        setSuccessInfo({
          token: response.data.token,
          redirect: response.data.redirect,
          message:
            "Donasi berhasil dibuat! Mengalihkan ke halaman pembayaran...",
        });

        setTimeout(() => {
          window.location.href = response.data.redirect;
        }, 2000);
      } else {
        setSuccessInfo({ message: "Donasi berhasil dibuat! Terima kasih." });
        resetForm();
      }
    } catch (err) {
      setError(err.message || "Gagal membuat donasi. Silahkan coba lagi.");
    }
  };

  return {
    donationAmount,
    setDonationAmount,
    donorName,
    setDonorName,
    donorNumber,
    setDonorNumber,
    donationMessage,
    setDonationMessage,
    error,
    successInfo,
    formRef,

    isSubmitting,
    donationMutation,

    handleSubmit,
    resetForm,
  };
};

export default useDonationForm;
