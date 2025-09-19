import { useState } from 'react';
import { useMutations } from '../api/get-mutations';
import { useMutationSummary } from '../api/get-summary';
import { API_URL } from '@/config/env';

export function useMutation() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, error, refetch: refetchMutations } = useMutations(currentPage, limit);
  const { data: summaryData, isLoading: isSummaryLoading, error: summaryError } = useMutationSummary();
  
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
    window.open(`${API_URL}/mutations/excel`, '_blank');
  };

  const renderMutationSkeletons = () => {
    return Array.from({ length: 4 }, (_, index) => ({
      id: index
    }));
  };

  const renderPaginationSkeleton = () => {
    return {
      show: isLoading
    };
  };
  const calculateSummary = () => {
    if (summaryData && summaryData.data) {
      return {
        income: summaryData.data.income || 0,
        expense: summaryData.data.spending || 0,
        balance: summaryData.data.balance || 0
      };
    }
    
    if (!data || !data.data || !data.data.mutations) {
      return {
        income: 0,
        expense: 0,
        balance: 0
      };
    }

    let income = 0;
    let expense = 0;

    data.data.mutations.forEach(mutation => {
      if (mutation.mutationType === "Income") {
        income += mutation.mutationAmount;
      } else if (mutation.mutationType === "Expense") {
        expense += mutation.mutationAmount;
      }
    });

    return {
      income,
      expense,
      balance: income - expense
    };
  };
  return {
    data,
    isLoading,
    error,
    refetchMutations,
    summaryData,
    isSummaryLoading,
    summaryError,
    currentPage,
    limit,
    handleNextPage,
    handlePrevPage,
    handlePageChange,
    handleExportExcel,
    renderMutationSkeletons,
    renderPaginationSkeleton,
    calculateSummary
  };
}
