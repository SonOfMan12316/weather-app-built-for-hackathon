import { useState } from 'react'
import type {
  DropdownOption,
  DropdownGroup,
  DropdownProps,
  UsableDropdownProps,
  UnitSystem,
} from '../../types/global'
import { Checkmark, DropdownIcon } from '../icons'
import useClickOutside from '../hooks/useClickOutside'
import { dayGroups, unitGroups } from '../../data/DropdownOptions'
import classnames from 'classnames'

const Dropdown = ({
  options,
  placeholder = '',
  onSelect,
  selectedValue,
  className = '',
  placement = 'start',
  icon,
  system,
  onSwitchSystem,
  showLine,
  variant,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useClickOutside(() => setIsOpen(false))

  const handleSelect = (value: string) => {
    if (value === 'switch' && system) {
      const nextSystem = system === 'metric' ? 'imperial' : 'metric'
      onSwitchSystem?.(nextSystem)
      return
    }
    onSelect(value)
    setIsOpen(false)
  }

  const getSelectedLabel = () => {
    if (!selectedValue) return placeholder

    const allOptions: DropdownOption[] = []
    options.forEach((option) => {
      if ('title' in option) {
        allOptions.push(...option.options)
      } else {
        allOptions.push(option as DropdownOption)
      }
    })

    const selectedOption = allOptions.find((opt) => opt.value === selectedValue)
    return selectedOption ? selectedOption.label : placeholder
  }

  const hasGroups = options.length > 0 && 'title' in options[0]

  const iconClass = classnames({
    'font-medium': typeof icon === 'string',
    'left-0': placement === 'start',
  })

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        className={classnames(
          `h-10 flex space-x-3 px-4 items-center text-white rounded-lg font-medium text-xs`,
          { 'bg-ch-neutral-800': variant === 'unit' },
          { 'bg-ch-neutral-600': variant === 'days' }
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {icon && <span className={iconClass}>{icon}</span>}
        <span className="leading-none">{getSelectedLabel()}</span>
        <DropdownIcon />
      </button>
      {isOpen && (
        <div
          className={classnames(
            'absolute right-0 mt-2 py-1 px-1.5 w-12.65 border border-ch-neutral-600 bg-ch-neutral-800 rounded-2xl text-white z-50',
            {
              'animate-dropdown': isOpen,
              'animate-dropdown-reverse': !isOpen,
            }
          )}
          role="listbox"
        >
          {hasGroups
            ? (options as DropdownGroup[]).map((group, index) => (
                <div key={index} className="">
                  {group.title && (
                    <div
                      className={`${
                        group.title === 'Temperature' ||
                        group.title === 'Wind Speed' ||
                        group.title === 'Precipitation'
                          ? 'text-ch-grey text-xs font-medium pt-1 pb-1.5 mt-1'
                          : 'text-white text-xs font-medium pb-1.5'
                      } pl-1.5`}
                    >
                      {group.title}
                    </div>
                  )}
                  {group.options.map((option, optIndex) => {
                    const activeUnitSystem =
                      'system' in option && option.system === system
                    const isSelected = selectedValue === option.value
                    return (
                      <div key={optIndex}>
                        <div
                          className={classnames(
                            'flex justify-between hover:bg-ch-neutral-700 items-center font-normal cursor-pointer rounded-lg pl-1.5 px-1.5 py-2 mb-1 text-white',
                            {
                              'bg-ch-neutral-700':
                                activeUnitSystem || isSelected,
                              'pb-2.5': option.value === 'switch',
                            }
                          )}
                          onClick={() => handleSelect(option.value)}
                          role="option"
                          aria-selected={isSelected}
                        >
                          {option.label}
                          {activeUnitSystem && <Checkmark />}
                        </div>
                      </div>
                    )
                  })}
                  {showLine && group.title && index < options.length - 1 && (
                    <div className="border-b rounded-lg border-ch-neutral-600"></div>
                  )}
                </div>
              ))
            : (options as DropdownOption[]).map((option, index) => (
                <div
                  key={index}
                  className={`dropdown-item ${
                    selectedValue === option.value ? 'selected' : ''
                  }`}
                  onClick={() => handleSelect(option.value)}
                  role="option"
                  aria-selected={selectedValue === option.value}
                >
                  {option.label}
                </div>
              ))}
        </div>
      )}
    </div>
  )
}

export const UnitsDropdown = ({
  onSelect,
  className,
  icon,
  system,
  onSwitchSystem,
  showLine,
  variant,
}: UsableDropdownProps & {
  system: UnitSystem
  onSwitchSystem: (s: UnitSystem) => void
}) => {
  return (
    <div className="space-y-2">
      <Dropdown
        options={unitGroups(system)}
        onSelect={onSelect}
        placeholder="Units"
        className={className}
        icon={icon}
        system={system}
        onSwitchSystem={onSwitchSystem}
        showLine={showLine}
        variant={variant}
      />
    </div>
  )
}

export const DaysDropdown = ({
  onSelect,
  selectedValue,
  className,
  variant,
  placeholder,
}: UsableDropdownProps) => {
  return (
    <Dropdown
      options={dayGroups}
      onSelect={onSelect}
      selectedValue={selectedValue}
      placeholder={placeholder}
      className={className}
      variant={variant}
    />
  )
}

export default Dropdown
