import type { DropdownGroup, UnitSystem } from '../types/global'

export const unitGroups = (system: UnitSystem): DropdownGroup[] => [
  {
    title: '',
    options: [
      {
        value: 'switch',
        label: `Switch to ${system === 'metric' ? 'Imperial' : 'Metric'}`,
      },
    ],
  },
  {
    title: 'Temperature',
    options: [
      { value: 'celsius', label: 'Celsius (°C)', system: 'metric' },
      { value: 'fahrenheit', label: 'Fahrenheit (°F)', system: 'imperial' },
    ],
  },
  {
    title: 'Wind Speed',
    options: [
      { value: 'km/h', label: 'km/h', system: 'metric' },
      { value: 'mph', label: 'mph', system: 'imperial' },
    ],
  },
  {
    title: 'Precipitation',
    options: [
      { value: 'mm', label: 'Millimeters (mm)', system: 'metric' },
      { value: 'inches', label: 'Inches (in)', system: 'imperial' },
    ],
  },
]

export const dayGroups: DropdownGroup[] = [
  {
    title: 'Monday',
    options: [
      { value: 'tuesday', label: 'Tuesday' },
      { value: 'wednesday', label: 'Wednesday' },
      { value: 'thursday', label: 'Thursday' },
      { value: 'friday', label: 'Friday' },
      { value: 'saturday', label: 'Saturday' },
      { value: 'sunday', label: 'Sunday' },
    ],
  },
]
