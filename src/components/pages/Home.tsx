import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Header, WeatherInfo, Forecast, HourlyForecast } from '../HomePage'
import { Cancel, Loading, Reload, Search } from '../icons'
import { Button, Input } from '../ui'
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
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
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
  const [isLoadingCoordinates, setIsLoadingCoordinates] =
    useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [system, setSystem] = useState<UnitSystem>('metric')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [searchError, setSearchError] = useState(false)

  const fetchWeather = async (
    lat: number | undefined,
    long: number | undefined
  ) => {
    setIsLoadingWeatherData(true)
    setHasSearched(true)
    setError(false)

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
    }
  }

  const fetchCoordinates = async (cityName: string) => {
    if (cityName.trim() === '') {
      toast.error('Please enter a city name')
      return
    }
    setSearchError(false)
    setIsLoadingCoordinates(true)
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?city=${cityName}&format=json&apiKey=${API_KEY}`
      )
      const data = await response.json()
      if (data.results.length > 0) {
        setIsLoadingCoordinates(false)
        setCity(data.results[0].city)
        setCountry(data.results[0].country)
        setLocation({
          lat: data.results[0].lat,
          lon: data.results[0].lon,
        })
      } else {
        setIsLoadingCoordinates(false)
        setSearchError(true)
        setWeather(null)
      }
    } catch {
      setSearchError(true)
      setIsLoadingCoordinates(false)
    } finally {
    }
  }

  useEffect(() => {
    if (location) {
      fetchWeather(location.lat, location.lon)
    }
  }, [location])

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
          <div>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 sm:w-9/12 lg:w-6/12 xl:w-[55%] sm:mx-auto">
              <div className="sm:w-10/12 relative">
                <Input
                  placeholder="Search for a place..."
                  variant="search"
                  icon={<Search />}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value.replace(/[^a-zA-Z\s]/g, ''))
                  }}
                />
                {isLoadingCoordinates && (
                  <div className="absolute top-28 sm:top-14 w-full px-3 bg-ch-neutral-800 border border-ch-neutral-700 flex items-center h-11 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Loading className="animate-spin" />{' '}
                      <span className="text-white text-xs font-normal mt-0.5">
                        Search in progress
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="sm:w-2/12 sm:max-w-[85px]">
                <Button size="xs" onClick={() => fetchCoordinates(searchQuery)}>
                  Search
                </Button>
              </div>
            </div>
            {searchError && (
              <span className="text-center mt-10 font-sm font-semibold text-white mx-auto block">
                No search result found!
              </span>
            )}
          </div>
          {hasSearched && !searchError && (
            <div className="lg:flex lg:gap-x-6">
              <div className="lg:w-2/3 space-y-6">
                <WeatherInfo
                  isLoadingWeatherData={isLoadingWeatherData}
                  currentWeatherInfo={currentWeatherInfo}
                  system={system}
                  city={city}
                  country={country}
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
          )}
        </>
      )}
    </div>
  )
}

export default Home
