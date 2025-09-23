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
import { type IconBankType } from '../types/global'

export const iconBank: IconBankType = {
  Rain: Rain,
  Sun: Sun,
  Snow: Snow,
  Drizzle: Drizzle,
  Fog: Fog,
  Thunderstorm: Thunderstorm,
  Overcast: OverCast,
  PartlyCloudy: PartlyCloudy,
}

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
