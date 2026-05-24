import { format } from 'date-fns';

export const formatDate = (
  date,
  pattern = 'MMM dd, yyyy'
) => {
  if (!date) return '';

  try {
    return format(new Date(date), pattern);
  } catch {
    return '';
  }
};