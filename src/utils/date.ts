const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const getDay = (value: string) => {
  const date = value ? new Date(value) : new Date()
  return days[date.getDay()]
}

export const getFullDate = () => {
  const todaysFullDate = new Date()
  const day = days[todaysFullDate.getDay()]
  const weekday = todaysFullDate.getDate()
  const month = months[todaysFullDate.getMonth()]
  const year = todaysFullDate.getFullYear()
  return `${day + ', ' + month + ' ' + weekday + ', ' + year}`
}
