import { useState } from 'react'
import Logo from '../../assets/logo/logo.svg'
import { UnitsDropdown } from '../ui/DropDown'
import { Setting } from '../icons'
import { type UnitSystem } from '../../types/global'

interface HeaderProp {
  system: UnitSystem
  setSystem: (s: UnitSystem) => void
}

const Header = ({ system, setSystem }: HeaderProp) => {
  const [selectedUnit, setSelectedUnit] = useState('')

  return (
    <header className="w-full py-4 md:py-6">
      <div className="flex items-center justify-between">
        <img className="w-1/2 sm:w-48" src={Logo} alt="weather logo" />
        <UnitsDropdown
          onSelect={setSelectedUnit}
          selectedValue=""
          system={system}
          onSwitchSystem={(next) => setSystem(next)}
          icon={<Setting />}
          showLine={true}
          variant="unit"
          data={system}
        />
      </div>
    </header>
  )
}

export default Header
