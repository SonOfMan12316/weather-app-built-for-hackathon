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

export const getFullDate = (value: string | undefined) => {
  if (!value) return
  const todaysFullDate = new Date(value)
  const day = days[todaysFullDate.getDay()]
  const weekday = todaysFullDate.getDate()
  const month = months[todaysFullDate.getMonth()]
  const year = todaysFullDate.getFullYear()
  return `${day + ', ' + month + ' ' + weekday + ', ' + year}`
}

export const getTime = (value: string | undefined) => {
  if (!value) return
  const date = new Date(value)
  const hours = date.getHours()
  const formattedHours = hours % 12 || 12
  const ampm = hours >= 12 ? 'PM' : 'AM'
  return `${formattedHours} ${ampm}`
}
