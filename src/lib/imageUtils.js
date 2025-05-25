// filepath: f:\web\fe-mosque-donation\src\lib\imageUtils.js
export function formatImageUrl(imagePath, baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:9999') {
  if (!imagePath) {
    return "https://placehold.co/600x400/CCCCCC/969696?text=No+Image";
  }
  
  if (imagePath.startsWith('blob:') || imagePath.startsWith('data:')) {
    return imagePath;
  }
  
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  const cleanPath = imagePath.replace(/\/{2,}/g, '/').trim();
  
  const formattedUrl = `${baseUrl}${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}`;
  return formattedUrl;
}

export function handleImageError(event, customMessage = 'No+Image') {
  const originalSrc = event.target.src;
  
  event.target.onerror = null;
  
  try {
    const url = new URL(originalSrc);
    // Path was accessed but not logged
  } catch (e) {
    // URL parsing error
  }
  
  const encodedOriginalSrc = encodeURIComponent(originalSrc.substring(0, 30) + '...');
  event.target.src = `https://placehold.co/600x400/CCCCCC/969696?text=${customMessage}&debug=${encodedOriginalSrc}`;
  event.target.classList.add('image-error');
  
  return false;
}
