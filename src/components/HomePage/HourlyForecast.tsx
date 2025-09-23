import { useState } from 'react'
import { DaysDropdown } from '../ui/DropDown'
import { getDay, getTime } from '../../utils/date'
import type { HourlyWeather } from '../../types/global'
import { getWeatherIconName } from '../../utils/global'
import { iconBank } from '../../data/WeatherDeatails'

interface HourlyForecastProp {
  isLoadingWeatherData?: boolean
  hourlyWeatherInfo: HourlyWeather | null
}

const HourlyForecastSkeleton = () => (
  <div className="border border-ch-neutral-600 bg-ch-neutral-700 rounded-lg h-[57px]"></div>
)

const HourlyForecast = ({ hourlyWeatherInfo }: HourlyForecastProp) => {
  const [selectedDay, setSelectedDay] = useState('')
  const [currentDay] = useState<string>(() => getDay(''))

  const currentHour = new Date().getHours()

  const futureHourlyForecast = hourlyWeatherInfo?.time?.filter((_, index) => {
    const forecastTime = hourlyWeatherInfo.time[index]
    const forecastHour = new Date(forecastTime).getHours()
    return forecastHour > currentHour
  })

  const arrayForHourlyWeatherInfo = futureHourlyForecast?.map((time, index) => {
    return {
      time: time,
      temperature_2m: hourlyWeatherInfo?.temperature_2m[index],
      weather_code: hourlyWeatherInfo?.weather_code[index],
    }
  })

  return (
    <div className="p-5 mt-7 bg-ch-neutral-800 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-sm font-semibold text-white">Hourly forecast</h1>
        <DaysDropdown
          onSelect={setSelectedDay}
          selectedValue={selectedDay}
          placeholder={currentDay}
          variant="days"
          data={hourlyWeatherInfo}
        />
      </div>
      <div className="flex flex-col space-y-3">
        {!hourlyWeatherInfo
          ? [...Array(8)].map((_, index) => (
              <HourlyForecastSkeleton key={index} />
            ))
          : arrayForHourlyWeatherInfo?.slice(0, 8)?.map((forecast, index) => {
              if (!forecast || !forecast.weather_code) {
                return null
              }

              const Icon = iconBank[getWeatherIconName(forecast.weather_code)]

              return (
                <div
                  key={index}
                  className="border border-ch-neutral-600 bg-ch-neutral-700 py-2 px-3 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      svgWidth="40"
                      svgHeight="40"
                      rectWidth="40"
                      rectHeight="40"
                    />
                    <h1 className="text-white mt-1">
                      {getTime(forecast.time)}
                    </h1>
                  </div>
                  <h1 className="text-white mt-1">
                    {forecast.temperature_2m}°
                  </h1>
                </div>
              )
            })}
      </div>
    </div>
  )
}

export default HourlyForecast
