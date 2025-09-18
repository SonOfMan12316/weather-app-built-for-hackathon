import {
  Drizzle,
  Fog,
  PartlyCloudy,
  Rain,
  Snow,
  Sun,
  Thunderstorm,
  OverCast,
} from '../components/icons'

export const WeatherDetails = [
  {
    title: 'feels like',
    value: '64°',
  },
  {
    title: 'humidity',
    value: '46' + '%',
  },
  {
    title: 'Wind',
    value: '9' + ' mph',
  },
  {
    title: 'Precipitation',
    value: '0' + ' in',
  },
]

export const ForeCastDetails = [
  {
    day: 'Tue',
    icon: Rain,
    minTemp: '68°',
    maxTemp: '57°',
  },
  {
    day: 'Wed',
    icon: Drizzle,
    minTemp: '70°',
    maxTemp: '59°',
  },
  {
    day: 'Thu',
    icon: Sun,
    minTemp: '75°',
    maxTemp: '57°',
  },
  {
    day: 'Fri',
    icon: PartlyCloudy,
    minTemp: '77°',
    maxTemp: '55°',
  },
  {
    day: 'Sat',
    icon: Thunderstorm,
    minTemp: '70°',
    maxTemp: '59°',
  },
  {
    day: 'Sun',
    icon: Snow,
    minTemp: '77°',
    maxTemp: '61°',
  },
  {
    day: 'Mon',
    icon: Fog,
    minTemp: '75°',
    maxTemp: '59°',
  },
]

export const HourlyForecastDetails = [
  {
    time: '3PM',
    icon: OverCast,
    minTemp: '68°',
  },
  {
    time: '4PM',
    icon: PartlyCloudy,
    minTemp: '68°',
  },
  {
    time: '5PM',
    icon: Sun,
    minTemp: '68°',
  },
  {
    time: '6PM',
    icon: OverCast,
    minTemp: '66°',
  },
  {
    time: '7PM',
    icon: Snow,
    minTemp: '66°',
  },
  {
    time: '8PM',
    icon: Fog,
    minTemp: '64°',
  },
  {
    time: '9PM',
    icon: Snow,
    minTemp: '63°',
  },
  {
    time: '10PM',
    icon: OverCast,
    minTemp: '63°',
  },
]
