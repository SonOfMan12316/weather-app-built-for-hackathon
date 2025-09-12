import { useState } from 'react'
import Logo from '../../assets/logo/logo.svg'
import { UnitsDropdown } from '../ui/DropDown'
import { Setting } from '../icons'
import { type UnitSystem } from '../../types/global'

const Header = () => {
  const [selectedUnit, setSelectedUnit] = useState('')
  const [system, setSystem] = useState<UnitSystem>('metric')
  return (
    <header className="w-full p-4 md:py-8">
      <div className="flex items-center justify-between">
        <img className="w-1/2 sm:w-48" src={Logo} alt="weather logo" />
        <UnitsDropdown
          onSelect={setSelectedUnit}
          selectedValue=""
          system={system}
          onSwitchSystem={(next) => setSystem(next)}
          icon={<Setting />}
        />
      </div>
    </header>
  )
}

export default Header
