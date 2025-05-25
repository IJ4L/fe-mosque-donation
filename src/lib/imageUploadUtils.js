export function validateImageFile(file) {
  if (!file) {
    return { valid: false, message: "Tidak ada file yang dipilih" };
  }
  
  if (file.size === 0) {
    return { valid: false, message: "File kosong (0 byte)" };
  }
  
  if (file.size > 5 * 1024 * 1024) {
    return { valid: false, message: "Ukuran file terlalu besar (max 5MB)" };
  }
  
  if (!file.type.startsWith('image/')) {
    return { valid: false, message: "File bukan gambar yang valid" };
  }
  
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      message: `Format tidak didukung. Gunakan: ${allowedTypes.map(t => t.split('/')[1]).join(', ')}` 
    };
  }
  
  return { valid: true, message: "File valid" };
}

export function createCleanImageFile(file) {
  const cleanName = file.name.replace(/[^\w\s\-\.]/g, '_');
  return new File([file], cleanName, { type: file.type });
}

export async function createImagePreview(file) {
  if (!file) return null;
  
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.message);
  }
  
  return URL.createObjectURL(file);
}

export function revokeBlobUrl(blobUrl) {
  if (blobUrl && blobUrl.startsWith('blob:')) {
    try {
      URL.revokeObjectURL(blobUrl);
    } catch (error) {

    }
  }
}

export function prepareImageFormData(file, textFields = {}) {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.message);
  }
  
  const formData = new FormData();
  
  const cleanFile = createCleanImageFile(file);
  formData.append('newsImage', cleanFile);
  
  Object.entries(textFields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value).trim());
    }
  });
  
  return formData;
}
