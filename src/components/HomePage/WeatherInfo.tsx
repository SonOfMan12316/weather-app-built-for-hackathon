import { useState, useEffect } from 'react'
import InfoCard from '../global/InfoCard'
import toast from 'react-hot-toast'
import { getCurrentLocationLatitudeAndLongitude } from '../hooks/getCurrentLocation'
import { getFullDate } from '../../utils/date'
import { type CurrentWeather } from '../../types/global'
import { LoadingDots } from '../ui'
import { iconBank } from '../../data/WeatherDeatails'
import { getWeatherIconName } from '../../utils/global'

interface WeatherInfoProps {
  currentWeatherInfo: CurrentWeather | null
  isLoadingWeatherData: boolean
}

const WeatherInfo = ({
  currentWeatherInfo,
  isLoadingWeatherData,
}: WeatherInfoProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  )
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')

  useEffect(() => {
    getCurrentLocationLatitudeAndLongitude((error, location) => {
      if (error) {
        toast.error('Error getting latitude and longitude')
      }
      if (location) {
        setCoords(location)
      }
    })
  }, [])

  useEffect(() => {
    if (!coords) return

    setIsLoading(true)

    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords?.lat}&longitude=${coords?.lon}&localityLanguage=en`
    )
      .then((res) => res.json())
      .then((data) => {
        setCity(data.city)
        setCountry(data.countryName)
        setIsLoading(false)
      })
      .catch((err) => toast.error(`${err}`))
      .finally(() => {
        setIsLoading(false)
      })
  }, [coords])

  const WeatherDetails = [
    {
      title: 'feels like',
      value: `${currentWeatherInfo?.temperature_2m + '°'}`,
    },
    {
      title: 'humidity',
      value: `${currentWeatherInfo?.relative_humidity_2m + '%'}`,
    },
    {
      title: 'Wind',
      value: `${currentWeatherInfo?.wind_speed_10m + 'km/h'}`,
    },
    {
      title: 'Precipitation',
      value: `${currentWeatherInfo?.precipitation + ' mm'}`,
    },
  ]

  const weatherCode = currentWeatherInfo?.weather_code || 0
  const Icon = iconBank[getWeatherIconName(weatherCode)]

  return (
    <div className="lg:mt-7">
      <div
        className={`${
          isLoading || isLoadingWeatherData
            ? 'bg-ch-neutral-800'
            : 'bg-mobileBg md:bg-desktopBg bg-cover bg-no-repeat'
        } mt-4 md:mt-6 py-auto sm:px-4 mb-3.5 lg:mb-6 h-[220px] lg:h-[270px] rounded-b-3xl flex flex-col sm:flex-row justify-center sm:justify-between items-center text-white rounded-3xl`}
      >
        {!currentWeatherInfo ? (
          <div className="mx-auto flex flex-col justify-center items-center">
            <LoadingDots />
            <span className="text-ch-light-grey text-xs font-medium mt-1">
              Loading...
            </span>
          </div>
        ) : (
          currentWeatherInfo && (
            <>
              <div>
                {!isLoading && city && country && (
                  <h1 className="font-bold text-lg">
                    {city}, {country}
                  </h1>
                )}
                <h2 className="text-sm font-normal text-center md:text-start text-white/80 mt-1">
                  {getFullDate(currentWeatherInfo.time)}
                </h2>
              </div>
              <div className="flex items-center">
                <Icon
                  svgWidth="120"
                  svgHeight="120"
                  rectWidth="120"
                  rectHeight="120"
                />
                <h3 className="font-semibold text-2xl sm:text-[6rem] italic">
                  {currentWeatherInfo.temperature_2m}°
                </h3>
              </div>
            </>
          )
        )}
      </div>
      <div className="grid grid-cols-2 sm:flex gap-3 sm:gap-0 sm:gap-x-3 lg:gap-x-6">
        {WeatherDetails.map((weather, index) => (
          <InfoCard
            key={index}
            title={weather.title}
            value={weather.value}
            height="100"
            currentWeatherInfo={currentWeatherInfo}
          />
        ))}
      </div>
    </div>
  )
}

export default WeatherInfo
