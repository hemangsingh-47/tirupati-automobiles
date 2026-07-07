/**
 * Returns the full URL for an uploaded file.
 * Uses the VITE_API_URL env variable in production, falls back to localhost in dev.
 */
export const getUploadUrl = (filePath) => {
  if (!filePath) return '';
  if (filePath.startsWith('http')) return filePath;
  
  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
  return `${baseUrl}/uploads/${filePath}`;
};
