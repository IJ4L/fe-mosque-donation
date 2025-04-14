// Web worker for offloading expensive operations from the main thread
// This improves main thread performance by handling heavy calculations elsewhere

// List of operations this worker can perform
const operations = {
  // Calculate statistics from donation data
  calculateDonationStats: (donations) => {
    // Simulate heavy calculation
    const total = donations.reduce((sum, donation) => sum + donation.amount, 0);
    const average = total / donations.length;
    const max = Math.max(...donations.map(d => d.amount));
    const min = Math.min(...donations.map(d => d.amount));
    
    return {
      total,
      average,
      max,
      min,
      count: donations.length
    };
  },
  
  // Format large amounts of data
  formatBulkData: (data) => {
    return data.map(item => ({
      ...item,
      formattedAmount: new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(item.amount)
    }));
  }
};

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  const { id, operation, data } = event.data;
  
  if (operations[operation]) {
    try {
      // Execute the requested operation
      const result = operations[operation](data);
      
      // Send the result back to the main thread
      self.postMessage({
        id,
        result,
        error: null
      });
    } catch (error) {
      self.postMessage({
        id,
        result: null,
        error: error.message
      });
    }
  } else {
    self.postMessage({
      id,
      result: null,
      error: `Unknown operation: ${operation}`
    });
  }
});