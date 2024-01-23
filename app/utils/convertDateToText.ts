const convertDateToText = (mongoDate: string): string => {
  const date = new Date(mongoDate)
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
  return date.toLocaleString(undefined, options).replace(',', ' - ')
}
export default convertDateToText
