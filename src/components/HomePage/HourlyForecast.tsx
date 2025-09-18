import { useState } from 'react'
import { DaysDropdown } from '../ui/DropDown'
import { HourlyForecastDetails } from '../../data/WeatherDeatails'

const HourlyForecast = () => {
  const [selectedDay, setSelectedDay] = useState('')

  return (
    <div className="p-5 mt-7 bg-ch-neutral-800 rounded-xl">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-sm font-semibold text-white">Hourly forecast</h1>
        <DaysDropdown onSelect={setSelectedDay} variant="days" />
      </div>
      <div className="flex flex-col space-y-3">
        {HourlyForecastDetails.map((dayForecast, index) => (
          <div
            key={index}
            className="border border-ch-neutral-600 bg-ch-neutral-700 py-2 px-3 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <dayForecast.icon
                svgWidth="40"
                svgHeight="40"
                rectWidth="40"
                rectHeight="40"
              />
              <h1 className="text-white mt-1">{dayForecast.time}</h1>
            </div>
            <h1 className="text-white mt-1">{dayForecast.minTemp}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HourlyForecast
