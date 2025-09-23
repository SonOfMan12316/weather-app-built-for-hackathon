import type { ReactNode } from 'react'

export interface DropdownOption {
  label: string
  value: string
  system?: UnitSystem | 'all'
  group?: string
}

export interface DropdownGroup {
  title?: string
  options: DropdownOption[]
}

export interface DropdownProps {
  options: DropdownOption[] | DropdownGroup[]
  placeholder?: string
  onSelect: (value: string) => void
  selectedValue?: string
  className?: string
  icon?: string | ReactNode
  placement?: 'start'
  system?: string
  onSwitchSystem?: (s: UnitSystem) => void
  showLine?: boolean
  variant?: 'unit' | 'days'
  data?: any
}

export interface UsableDropdownProps {
  onSelect: (value: string) => void
  selectedValue?: string
  className?: string
  icon?: string | ReactNode
  showLine?: boolean
  variant?: 'unit' | 'days'
  placeholder?: string
  data?: any
}

export type UnitSystem = 'metric' | 'imperial'
export type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

export interface svgProp {
  svgWidth: string
  svgHeight: string
  rectWidth: string
  rectHeight: string
}

export interface CurrentWeather {
  time: string
  relative_humidity_2m: number
  temperature_2m: number
  precipitation: number
  wind_speed_10m: number
  weather_code: number
}

export interface DailyWeather {
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  time: string[]
  weather_code: number[]
}

export interface HourlyWeather {
  temperature_2m: number[]
  time: string[]
  weather_code: number[]
}

export interface WeatherInterface {
  current: CurrentWeather | null
  daily: DailyWeather | null
  hourly: HourlyWeather | null
}

export type IconBankType = {
  [key: string]: React.ElementType
}
