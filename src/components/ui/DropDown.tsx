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
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useClickOutside(() => setIsOpen(false))

  const handleSelect = (value: string) => {
    if (value === 'switch') {
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

  const iconClass = classnames('mr-1', {
    'font-medium': typeof icon === 'string',
    'ml-4 left-0': placement === 'start',
  })

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        className="h-10 flex space-x-2 lg:space-x-3 items-center bg-ch-neutral-800 text-white rounded-lg font-medium text-xs"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {icon && <span className={iconClass}>{icon}</span>}
        {getSelectedLabel()}
        <DropdownIcon />
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}></span>
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-1.5 py-2 px-1.5 w-12.65 border border-ch-neutral-600 bg-ch-neutral-800 rounded-lg text-white"
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
                          ? 'text-ch-grey text-xs font-normal pb-1 mt-1'
                          : 'text-white text-xs font-medium pb-1.5'
                      } pl-1.5`}
                    >
                      {group.title}
                    </div>
                  )}
                  {group.options.map((option, optIndex) => {
                    const isActive = option.system === system
                    const isSelected = selectedValue === option.value
                    return (
                      <div key={optIndex}>
                        <div
                          className={classnames(
                            'flex justify-between items-center font-normal cursor-pointer rounded pl-1.5 px-1.5 py-1.5 mb-1 text-white',
                            {
                              'bg-ch-neutral-700 rounded-lg ': isActive,
                              'pb-2': option.value === 'switch',
                            }
                          )}
                          onClick={() => handleSelect(option.value)}
                          role="option"
                          aria-selected={isSelected}
                        >
                          {option.label}
                          {isActive && <Checkmark />}
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
      />
    </div>
  )
}

export const DaysDropdown = ({
  onSelect,
  selectedValue,
  className,
}: UsableDropdownProps) => {
  return (
    <Dropdown
      options={dayGroups}
      onSelect={onSelect}
      selectedValue={selectedValue}
      placeholder="Monday"
      className={className}
    />
  )
}

export default Dropdown
