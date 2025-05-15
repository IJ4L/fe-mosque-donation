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

// Image optimization utilities
export function getImageUrl(imagePath, size = 'default') {
  // Get base URL from environment or use default
  const baseUrl = import.meta.env.VITE_CDN_URL || '';
  
  // Size mappings for responsive images
  const sizes = {
    small: '300w',
    medium: '600w',
    large: '1200w',
    default: ''
  };
  
  // If we have a CDN, use it with size parameter
  if (baseUrl) {
    const sizeParam = sizes[size] ? `?size=${sizes[size]}` : '';
    return `${baseUrl}${imagePath}${sizeParam}`;
  }
  
  // Otherwise just return the local path
  return imagePath;
}

// Format currency for better rendering performance
export function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Debounce function for performance-heavy handlers
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

// Memoize expensive calculations
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

// Format date for display
export function formatDate(dateString) {
  const date = new Date(dateString);
  
  // Format: 24, Mei 2024
  const day = date.getDate();
  
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const month = months[date.getMonth()];
  
  const year = date.getFullYear();
  
  return `${day}, ${month} ${year}`;
}

// Format time for display
export function formatTime(dateString) {
  const date = new Date(dateString);
  
  // Format: 23:00
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${hours}.${minutes}`;
}