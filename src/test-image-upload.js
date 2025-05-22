import axios from 'axios';

/**
 * Test function to diagnose image upload issues
 */
async function testImageUpload() {
  try {
    console.log('⏳ Testing image upload...');
    
    // Step 1: Create a simple FormData with a small test image
    const formData = new FormData();
    
    // Create a small test image (1x1 pixel transparent GIF)
    const base64Gif = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    const byteCharacters = atob(base64Gif);
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    
    const blob = new Blob(byteArrays, { type: 'image/gif' });
    const testFile = new File([blob], 'test-image.gif', { type: 'image/gif' });
    
    formData.append('newsImage', testFile);
    formData.append('newsName', 'Test News Title');
    formData.append('newsDescription', 'Test news description for debugging');
    formData.append('newsAuthor', '1');
    
    console.log('📦 FormData prepared:');
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File (${value.name}, ${value.size} bytes, ${value.type})`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }
    
    // Step 2: Attempt to post the data
    console.log('🚀 Sending POST request to server...');    const response = await axios.post(
      'http://localhost:9999/news',
      formData,
      {
        headers: {
          // IMPORTANT: Don't set Content-Type manually for multipart/form-data
          // The browser needs to generate correct boundary value
        },
        transformRequest: [data => data] // Don't transform FormData
      }
    );
    
    console.log('✅ Success! Server responded with:', response.data);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('❌ Error during test:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return {
      success: false,
      error: error
    };
  }
}

/**
 * A more robust test that creates a color image for better visual testing
 */
async function testColorImageUpload() {
  try {
    console.log('⏳ Testing color image upload...');
    
    // Create a canvas element to generate a color test image
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    // Draw a gradient background
    const gradient = ctx.createLinearGradient(0, 0, 200, 200);
    gradient.addColorStop(0, '#3498db');
    gradient.addColorStop(1, '#2ecc71');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 200, 200);
    
    // Add text
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('Test Image', 100, 100);
    ctx.fillText(new Date().toLocaleTimeString(), 100, 130);
    
    // Convert canvas to blob
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    
    // Create file from blob
    const testFile = new File([blob], `test-image-${Date.now()}.png`, { type: 'image/png' });
    
    // Create FormData
    const formData = new FormData();
    formData.append('newsImage', testFile);
    formData.append('newsName', `Test Upload ${new Date().toLocaleTimeString()}`);
    formData.append('newsDescription', 'This test image checks color reproduction and timestamp visibility');
    formData.append('newsAuthor', '1');
    
    // Send the request
    console.log('🎨 Sending color test image...');
    const response = await axios.post(
      'http://localhost:9999/news',
      formData,
      {
        headers: {}, // Let browser set Content-Type with correct boundary
        transformRequest: [data => data]
      }
    );
    
    console.log('✅ Color test successful:', response.data);
    return {
      success: true,
      data: response.data,
      imageUrl: response.data?.data?.newsImage || null
    };
  } catch (error) {
    console.error('❌ Color test failed:', error);
    return {
      success: false,
      error: error
    };
  }
}

// If running in browser, make functions available globally
if (typeof window !== 'undefined') {
  window.testImageUpload = testImageUpload;
  window.testColorImageUpload = testColorImageUpload;
  console.log('📸 Image upload test utilities loaded!');
  console.log('Run window.testImageUpload() or window.testColorImageUpload() to test');
}

// Export the test functions
export { testImageUpload, testColorImageUpload };
