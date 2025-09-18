export const getDay = (value: string) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  const date = value ? new Date(value) : new Date()
  return days[date.getDay()]
}
