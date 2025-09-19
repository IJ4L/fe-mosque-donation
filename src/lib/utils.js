import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges class names using clsx and tailwind-merge
 * @param {...(string | undefined | null | boolean | object)} inputs - Class names to be combined
 * @returns {string} - Merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(imagePath, size = 'default') {
  const baseUrl = import.meta.env.VITE_CDN_URL || '';
  
  const sizes = {
    small: '300w',
    medium: '600w',
    large: '1200w',
    default: ''
  };
  
  if (baseUrl) {
    const sizeParam = sizes[size] ? `?size=${sizes[size]}` : '';
    return `${baseUrl}${imagePath}${sizeParam}`;
  }
  
  return imagePath;
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}, ${month} ${year}`;
}

export function formatTime(dateString) {
  const date = new Date(dateString);
  
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${hours}.${minutes}`;
}