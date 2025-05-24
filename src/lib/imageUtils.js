
export function formatImageUrl(imagePath, baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:9999') {
  console.log("formatImageUrl - Received path:", imagePath);
  
  if (!imagePath) {
    console.log("formatImageUrl - No path provided, returning fallback");
    return "https://placehold.co/600x400/CCCCCC/969696?text=No+Image";
  }
  
  if (imagePath.startsWith('blob:') || imagePath.startsWith('data:')) {
    console.log("formatImageUrl - Client-side URL, using as-is");
    return imagePath;
  }
  
  if (imagePath.startsWith('http')) {
    console.log("formatImageUrl - Path already has http, using as-is");
    return imagePath;
  }
  
  const cleanPath = imagePath.replace(/\/{2,}/g, '/').trim();
  
  const formattedUrl = `${baseUrl}${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}`;
  console.log("formatImageUrl - Formatted URL:", formattedUrl);
  return formattedUrl;
}

export function handleImageError(event, customMessage = 'No+Image') {
  const originalSrc = event.target.src;
  console.log(`handleImageError - Image failed to load: ${originalSrc}`);
  
  event.target.onerror = null;
  
  try {
    const url = new URL(originalSrc);
    console.log(`Image path was: ${url.pathname}`);
  } catch (e) {
    console.log('Could not parse URL');
  }
  
  const encodedOriginalSrc = encodeURIComponent(originalSrc.substring(0, 30) + '...');
  event.target.src = `https://placehold.co/600x400/CCCCCC/969696?text=${customMessage}&debug=${encodedOriginalSrc}`;
  event.target.classList.add('image-error');
  
  console.log("handleImageError - Replaced with fallback image");
  
  return false;
}
