export const isValueEmpty = (value: any) => {
  if (Array.isArray(value) && value.length === 0) return true;
  if (value && (typeof value === 'string' || value instanceof String)) {
    value = value.trim();
  }
  return !value && value !== 0 && value !== false;
};
