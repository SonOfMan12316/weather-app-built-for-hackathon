import { useState, useEffect } from 'react'
import { Sun } from '../icons'
import { WeatherDetails } from '../../data/WeatherDeatails'
import InfoCard from '../global/InfoCard'
import toast from 'react-hot-toast'
import { getCurrentLocationLatitudeAndLongitude } from '../hooks/getCurrentLocation'
import { getFullDate } from '../../utils/date'

const WeatherInfo = () => {
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
      })
      .catch((err) => toast.error(`${err}`))
      .finally(() => {
        setIsLoading(false)
      })
  }, [coords])

  return (
    <div className="lg:mt-7">
      <div className="bg-mobileBg md:bg-desktopBg mt-4 md:mt-6 py-auto sm:px-4 mb-3.5 lg:mb-6 bg-cover bg-no-repeat h-[220px] lg:h-[270px] rounded-b-3xl flex flex-col sm:flex-row justify-center sm:justify-between items-center text-white">
        <div>
          {isLoading && <h1>Loading location data...</h1>}
          {!isLoading && city && country && (
            <h1 className="font-bold text-lg">
              {city}, {country}
            </h1>
          )}
          <h2 className="text-sm font-normal text-center md:text-start text-white/70 mt-1.55">
            {getFullDate()}
          </h2>
        </div>
        <div className="flex items-center">
          <Sun svgWidth="61" svgHeight="60" rectWidth="60" rectHeight="60" />
          <h3 className="font-semibold text-8xl italic">68°</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:flex gap-3 sm:gap-0 sm:gap-x-3">
        {WeatherDetails.map((weather, index) => (
          <InfoCard
            key={index}
            title={weather.title}
            value={weather.value}
            height="90"
          />
        ))}
      </div>
    </div>
  )
}

export default WeatherInfo
