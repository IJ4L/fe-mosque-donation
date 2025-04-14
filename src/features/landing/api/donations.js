// Sample API function to fetch donations with optimizations
export const fetchTopDonations = async () => {
  // Implement client-side caching with localStorage
  const cachedData = localStorage.getItem('topDonations');
  const cacheTimestamp = localStorage.getItem('topDonationsTimestamp');
  const now = Date.now();
  
  // Use cached data if it exists and is less than 5 minutes old
  if (cachedData && cacheTimestamp && (now - parseInt(cacheTimestamp)) < 5 * 60 * 1000) {
    return JSON.parse(cachedData);
  }
  
  // In a real application, this would be a fetch to your API
  // For demonstration, we'll return mock data with reduced delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        { id: 1, name: 'Lutfi Halimawan', amount: 5000000 },
        { id: 2, name: 'Ahmad Rahman', amount: 4500000 },
        { id: 3, name: 'Siti Fatimah', amount: 4000000 },
        { id: 4, name: 'Muhammad Arif', amount: 3500000 },
        { id: 5, name: 'Aisyah Putri', amount: 3000000 },
      ];
      
      // Cache the result in localStorage
      localStorage.setItem('topDonations', JSON.stringify(data));
      localStorage.setItem('topDonationsTimestamp', now.toString());
      
      resolve(data);
    }, 300); // Reduced simulation delay
  });
};