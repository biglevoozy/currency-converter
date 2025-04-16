export function getPreviousDays(
  numOfPrevDays: number,
  offsetFromCurrentDate: number,
) {
  const arrayOfDays = [];

  for (let i = offsetFromCurrentDate; i <= numOfPrevDays; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    arrayOfDays.push(date.toISOString().split('T')[0]);
  }
  return arrayOfDays;
}

export function formatToMonthDay(date: string) {
  const dateObj = new Date(date);
  return dateObj.toLocaleString('default', {
    day: '2-digit',
    month: '2-digit',
  });
}

export function getToday() {
  const date = new Date();
  return date.toLocaleDateString('default', {
    day: '2-digit',
    month: 'long',
  });
}
