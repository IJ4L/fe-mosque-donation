import { useState, useEffect } from 'react';
import { useMonthSummary } from '../api/get-month-summary';
import { formatCurrency } from '@/lib/utils';

/**
 * Custom hook untuk mengelola data dan status cash summary
 * @returns {Object} Data dan status cash summary
 */
export function useCashSummary() {
  const getCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  };
  
  const [currentMonth] = useState(getCurrentMonth());
  const [monthName, setMonthName] = useState('');

  useEffect(() => {
    const [year, month] = currentMonth.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    
    const options = { month: 'long', year: 'numeric' };
    const formattedMonth = new Intl.DateTimeFormat('id-ID', options).format(date);
    
    setMonthName(formattedMonth);
  }, [currentMonth]);

  const {
    data: summaryData,
    isLoading,
    error,
    refetch
  } = useMonthSummary(currentMonth);

  const formattedData = {
    income: summaryData?.data?.income ? formatCurrency(summaryData.data.income) : 'Rp 0',
    expense: summaryData?.data?.spending ? formatCurrency(summaryData.data.spending) : 'Rp 0',
    balance: summaryData?.data?.balance ? formatCurrency(summaryData.data.balance) : 'Rp 0',
  };
  const handleRetryFetch = () => {
    refetch();
  };
  return {
    data: formattedData,
    monthName,
    isLoading,
    error,
    handleRetryFetch,
  };
}
