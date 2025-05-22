
/**
 * Format image URL with proper base URL handling
 * @param {string} imagePath - The image path from the server
 * @param {string} baseUrl - Base URL for the image server
 * @returns {string} Properly formatted image URL
 */
export function formatImageUrl(imagePath, baseUrl = 'http://localhost:9999') {
  console.log("formatImageUrl - Received path:", imagePath);
  
  // Return a fallback if no image path is provided
  if (!imagePath) {
    console.log("formatImageUrl - No path provided, returning fallback");
    return "https://placehold.co/600x400/CCCCCC/969696?text=No+Image";
  }
  
  // If it's a blob URL or data URL (already processed client-side), return it as is
  if (imagePath.startsWith('blob:') || imagePath.startsWith('data:')) {
    console.log("formatImageUrl - Client-side URL, using as-is");
    return imagePath;
  }
  
  // If the path already starts with http or https, return it as is
  if (imagePath.startsWith('http')) {
    console.log("formatImageUrl - Path already has http, using as-is");
    return imagePath;
  }
  
  // Check and handle common server path issues
  // Clean the path to handle any double slashes or strange characters
  const cleanPath = imagePath.replace(/\/{2,}/g, '/').trim();
  
  // Otherwise, join the base URL with the image path, ensuring correct slash handling
  const formattedUrl = `${baseUrl}${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}`;
  console.log("formatImageUrl - Formatted URL:", formattedUrl);
  return formattedUrl;
}

/**
 * Handle image error by replacing with a fallback image
 * @param {Event} event - The error event
 * @param {string} [customMessage] - Optional custom message for the fallback image
 */
export function handleImageError(event, customMessage = 'No+Image') {
  const originalSrc = event.target.src;
  console.log(`handleImageError - Image failed to load: ${originalSrc}`);
  
  // Prevent infinite loop
  event.target.onerror = null;
  
  // Try to extract original URL path for debugging
  try {
    const url = new URL(originalSrc);
    console.log(`Image path was: ${url.pathname}`);
  } catch (e) {
    console.log('Could not parse URL');
  }
  
  // Set a fallback image with the original source in the alt text for debugging
  const encodedOriginalSrc = encodeURIComponent(originalSrc.substring(0, 30) + '...');
  event.target.src = `https://placehold.co/600x400/CCCCCC/969696?text=${customMessage}&debug=${encodedOriginalSrc}`;
  event.target.classList.add('image-error');
  
  console.log("handleImageError - Replaced with fallback image");
  
  return false; // Prevent default error handling
}
