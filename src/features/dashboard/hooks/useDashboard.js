import { useState } from 'react';
import { useDonations } from '../api/get-donations';

export function useDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6; 
  const { data, isLoading, error } = useDonations(currentPage, limit);

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

  const handleExportExcel = () => {
    window.open('http://localhost:9999/donations/excel', '_blank');
  };

  return {
    data,
    isLoading,
    error,
    currentPage,
    handleNextPage,
    handlePrevPage,
    handlePageChange,
    handleExportExcel
  };
}
