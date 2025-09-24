import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Header, WeatherInfo, Forecast, HourlyForecast } from '../HomePage'
import { Cancel, Reload, Search } from '../icons'
import { Button, Input } from '../ui'
import { getCurrentLocationLatitudeAndLongitude } from '../hooks/getCurrentLocation'
import {
  type CurrentWeather,
  type DailyWeather,
  type HourlyWeather,
  type UnitSystem,
  type WeatherInterface,
} from '../../types/global'

type LocationType = {
  lat: number
  lon: number
}

const Home = () => {
  const [weather, setWeather] = useState<WeatherInterface | null>(null)
  const [location, setLocation] = useState<LocationType | null>(null)
  const [currentWeatherInfo, setCurrentWeatherInfo] =
    useState<CurrentWeather | null>(null)
  const [dailyWeatherInfo, setDailyWeatherInfo] = useState<DailyWeather | null>(
    null
  )
  const [hourlyWeatherInfo, setHourlyWeatherInfo] =
    useState<HourlyWeather | null>(null)
  const [isLoadingWeatherData, setIsLoadingWeatherData] =
    useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [system, setSystem] = useState<UnitSystem>('metric')

  const fetchWeather = async (
    lat: number | undefined,
    long: number | undefined
  ) => {
    setIsLoadingWeatherData(true)
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,weather_code,precipitation,wind_speed_10m&hourly=temperature_2m,weather_code&daily=temperature_2m_max,weather_code,temperature_2m_min&timezone=auto`
      )
      const data = await response.json()
      setWeather(data)
      setIsLoadingWeatherData(false)
    } catch (error: any) {
      setError(true)
      toast.error(error.message)
    } finally {
      setError(false)
      setIsLoadingWeatherData(false)
      setError(false)
    }
  }

  useEffect(() => {
    getCurrentLocationLatitudeAndLongitude((error, location) => {
      if (error) {
        setError(true)
        toast.error('Error getting latitude and longitude')
      }
      if (location) {
        const { lat, lon } = location
        setLocation({ lat, lon })
        fetchWeather(location.lat, location.lon)
      }
    })
  }, [])

  useEffect(() => {
    if (weather) {
      setCurrentWeatherInfo(weather.current)
      setDailyWeatherInfo(weather.daily)
      setHourlyWeatherInfo(weather.hourly)
    }
  }, [weather])

  return (
    <div className="min-h-screen px-3 md:px-6 lg:px-16 xl:px-20 pb-4 bg-ch-neutral-900 text-ch-neutral-900">
      <Header system={system} setSystem={setSystem} />
      {error ? (
        <div className="flex flex-col justify-center items-center my-10">
          <Cancel />
          <h1 className="font-bricolage font-semibold text-base sm:text-2xl text-white text-center my-3">
            Something went wrong
          </h1>
          <p className="text-ch-light-grey font-normal text-xs text-center mb-6 px-4 sm:w-7/12 lg:w-1/2 xl:w-[420px]">
            We couldn't connect to the server (API error). Please try again in a
            few moments.
          </p>
          <div className="mx-auto">
            <Button
              className="flex items-center justify-center space-x-2 px-4"
              variant="secondary"
              size="xs"
              onClick={() => fetchWeather(location?.lat, location?.lon)}
            >
              <Reload /> <span>Retry</span>
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="py-5 sm:w-8/12 lg:w-full sm:mx-auto">
            <h1 className="font-bricolage font-bold text-xl sm:text-2xl text-white text-center">
              How’s the sky looking today?
            </h1>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 sm:w-9/12 lg:w-6/12 xl:w-[55%] sm:mx-auto">
            <div className="sm:w-10/12">
              <Input
                placeholder="Search for a place..."
                variant="search"
                icon={<Search />}
              />
            </div>
            <div className="sm:w-2/12 sm:max-w-[85px]">
              <Button size="xs">Search</Button>
            </div>
          </div>
          <div className="lg:flex lg:gap-x-6">
            <div className="lg:w-2/3 space-y-6">
              <WeatherInfo
                isLoadingWeatherData={isLoadingWeatherData}
                currentWeatherInfo={currentWeatherInfo}
                system={system}
              />
              <Forecast
                isLoadingWeatherData={isLoadingWeatherData}
                dailyWeatherInfo={dailyWeatherInfo}
                system={system}
              />
            </div>
            <div className="lg:w-1/3">
              <HourlyForecast
                isLoadingWeatherData={isLoadingWeatherData}
                hourlyWeatherInfo={hourlyWeatherInfo}
                system={system}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
