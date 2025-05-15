import { useState } from 'react';
import { useDonations } from '../api/get-donations';

export function useDonationsAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { data, isLoading, error } = useDonations(currentPage, limit);
  const [viewingDonationId, setViewingDonationId] = useState(null);
  const [openDetailSheet, setOpenDetailSheet] = useState(false);

  const handleNextPage = () => {
    if (data?.data?.pagination && currentPage < data.data.pagination.totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewClick = (id) => {
    setViewingDonationId(String(id));
    setOpenDetailSheet(true);
  };
  
  const handleExportExcel = () => {
    window.open('http://localhost:9999/donations/excel', '_blank');
  };
  
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const getPaymentMethod = (type) => {
    switch (type) {
      case "bank_transfer":
        return "Transfer Bank";
      case "credit_card":
        return "Kartu Kredit";
      case "e_wallet":
        return "E-Wallet";
      default:
        return type;
    }
  };
  return {
    data,
    isLoading,
    error,
    currentPage,
    limit,
    openDetailSheet,
    viewingDonationId,
    setCurrentPage,
    setLimit,
    setOpenDetailSheet,
    handleNextPage,
    handlePrevPage,
    handlePageChange,
    handleViewClick,
    handleExportExcel,
    formatDate,
    getPaymentMethod
  };
}
