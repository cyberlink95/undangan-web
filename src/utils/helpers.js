export const formatDateSunda = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).toUpperCase();
};

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  alert('Disalin: ' + text);
};
