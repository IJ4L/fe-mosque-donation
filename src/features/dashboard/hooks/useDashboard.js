import { useState, useEffect } from 'react';
import { useDonations } from '../api/get-donations';

export function useDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const { data, isLoading, error } = useDonations(currentPage, limit);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setLimit(12);
      } else {
        setLimit(6);
      }
    };
    
    handleResize();
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
  const renderDonationSkeletons = () => {
    return Array.from({ length: limit }, (_, index) => ({
      id: index
    }));
  };

  const renderPaginationSkeleton = () => {
    return {
      show: isLoading
    };
  };

  return {
    data,
    isLoading,
    error,
    currentPage,
    limit,
    handleNextPage,
    handlePrevPage,
    handlePageChange,
    handleExportExcel,
    renderDonationSkeletons,
    renderPaginationSkeleton
  };
}
