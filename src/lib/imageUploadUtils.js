/**
 * Specialized utilities for image upload handling
 */

/**
 * Validates an image file before upload
 * @param {File} file - The file to validate
 * @returns {{valid: boolean, message: string}} Validation result
 */
export function validateImageFile(file) {
  if (!file) {
    return { valid: false, message: "Tidak ada file yang dipilih" };
  }
  
  if (file.size === 0) {
    return { valid: false, message: "File kosong (0 byte)" };
  }
  
  if (file.size > 5 * 1024 * 1024) { // 5MB limit
    return { valid: false, message: "Ukuran file terlalu besar (max 5MB)" };
  }
  
  // Check if it's an image type
  if (!file.type.startsWith('image/')) {
    return { valid: false, message: "File bukan gambar yang valid" };
  }
  
  // List of allowed image types
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      message: `Format tidak didukung. Gunakan: ${allowedTypes.map(t => t.split('/')[1]).join(', ')}` 
    };
  }
  
  return { valid: true, message: "File valid" };
}

/**
 * Creates a clean file object suitable for upload
 * @param {File} file - Original file
 * @returns {File} Cleaned file object
 */
export function createCleanImageFile(file) {
  // Clean the filename to prevent issues
  const cleanName = file.name.replace(/[^\w\s\-\.]/g, '_');
  
  // Create a new file with clean name
  return new File([file], cleanName, { type: file.type });
}

/**
 * Creates a blob URL from a file for preview
 * @param {File} file - The image file
 * @returns {Promise<string>} A blob URL for the image
 */
export async function createImagePreview(file) {
  if (!file) return null;
  
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.message);
  }
  
  return URL.createObjectURL(file);
}

/**
 * Helper to revoke blob URLs to prevent memory leaks
 * @param {string} blobUrl - The blob URL to revoke
 */
export function revokeBlobUrl(blobUrl) {
  if (blobUrl && blobUrl.startsWith('blob:')) {
    try {
      URL.revokeObjectURL(blobUrl);
      console.log('Revoked blob URL:', blobUrl);
    } catch (error) {
      console.error('Error revoking blob URL:', error);
    }
  }
}

/**
 * Helper to prepare FormData for image upload
 * @param {File} file - The image file to upload 
 * @param {Object} textFields - Key-value pairs of text fields to include
 * @returns {FormData} The prepared FormData object
 */
export function prepareImageFormData(file, textFields = {}) {
  // Validate the image first
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.message);
  }
  
  // Create a new FormData object
  const formData = new FormData();
  
  // Add the cleaned image file
  const cleanFile = createCleanImageFile(file);
  formData.append('newsImage', cleanFile);
  
  // Add all text fields
  Object.entries(textFields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value).trim());
    }
  });
  
  return formData;
}
