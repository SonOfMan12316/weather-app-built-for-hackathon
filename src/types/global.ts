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
}

export interface UsableDropdownProps {
  onSelect: (value: string) => void
  selectedValue?: string
  className?: string
  icon?: string | ReactNode
  showLine?: boolean
  variant?: 'unit' | 'days'
  placeholder?: string
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
