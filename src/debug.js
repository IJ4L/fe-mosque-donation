
/**
 * Debug helper functions
 */

/**
 * Log image information for debugging
 * @param {*} file - File object to debug
 */
export function debugImageFile(file) {
  if (!file) {
    console.log('DEBUG: File is null or undefined');
    return;
  }
  
  console.log('DEBUG: File info', {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: new Date(file.lastModified).toISOString()
  });
}

/**
 * Debug FormData content
 * @param {FormData} formData - FormData object to inspect
 */
export function debugFormData(formData) {
  console.log('DEBUG: FormData contents:');
  for (let [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`${key}:`, {
        name: value.name,
        size: value.size,
        type: value.type
      });
    } else {
      console.log(`${key}:`, value);
    }
  }
}
