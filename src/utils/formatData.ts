function insertZero(digit: number): string {
  return digit < 10 ? `0${digit}` : `${digit}`;
}

export function formatDate(date: Date): string {
  return `${date.getFullYear()}-${insertZero(date.getMonth() + 1)}-${insertZero(
    date.getDate()
  )}`;
}
