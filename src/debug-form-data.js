/**
 * Helper function to debug and fix image form data issues
 */

/**
 * Debug function to log FormData structure
 * @param {FormData} formData - The form data to debug
 */
export function logFormData(formData) {
  console.group('FormData Contents:');
  for (const pair of formData.entries()) {
    const [key, value] = pair;
    if (value instanceof File) {
      console.log(`${key}: File (name: ${value.name}, size: ${value.size} bytes, type: ${value.type})`);
    } else {
      console.log(`${key}: ${value}`);
    }
  }
  console.groupEnd();
}

/**
 * Cleans and prepares FormData for multipart upload
 * @param {FormData} formData - The original FormData
 * @returns {FormData} A new FormData object properly formatted for the server
 */
export function prepareFormData(formData) {
  console.log('Preparing form data for upload...');
  const cleanForm = new FormData();
  
  // Check and process all entries
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`Processing file field: ${key}`);
      
      // Ensure the file has proper content and is not corrupted
      if (value.size === 0) {
        console.warn(`Warning: File ${value.name} has zero size!`);
        continue;
      }
      
      // Clean the filename to avoid special characters issues
      const cleanName = value.name.replace(/[^\w\s\-\.]/g, '_');
      const cleanFile = new File([value], cleanName, { type: value.type });
      
      // Add the file to the cleaned form
      cleanForm.append(key, cleanFile);
      console.log(`Added file ${cleanName} (${cleanFile.size} bytes) to FormData`);
    } else {
      // Add non-file entries
      cleanForm.append(key, value);
      console.log(`Added field ${key}: ${value}`);
    }
  }
  
  return cleanForm;
}

/**
 * Creates and adds a debug image to FormData to test uploads
 * @param {FormData} formData - The FormData to add the test image to
 * @returns {FormData} The modified FormData with test image
 */
export function addTestImage(formData) {
  // Create a simple 1x1 transparent GIF
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
  const testFile = new File([blob], 'debug-test-image.gif', { type: 'image/gif' });
  
  formData.append('testImage', testFile);
  console.log('Added test image to FormData');
  
  return formData;
}
