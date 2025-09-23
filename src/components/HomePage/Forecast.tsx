import type { DailyWeather } from '../../types/global'
import { getDay } from '../../utils/date'
import { getWeatherIconName } from '../../utils/global'
import { iconBank } from '../../data/WeatherDeatails'

interface ForecastProps {
  isLoadingWeatherData: boolean
  dailyWeatherInfo: DailyWeather | null
}

const ForecastSkeleton = () => (
  <div className="bg-ch-neutral-800 border border-ch-neutral-600 rounded-lg h-[165px]"></div>
)

const Forecast = ({
  isLoadingWeatherData,
  dailyWeatherInfo,
}: ForecastProps) => {
  const arrayForDailyWeatherInfo = dailyWeatherInfo?.time.map((time, index) => {
    return {
      time: time,
      temperature_2m_max: dailyWeatherInfo.temperature_2m_max[index],
      temperature_2m_min: dailyWeatherInfo.temperature_2m_min[index],
      weather_code: dailyWeatherInfo.weather_code[index],
    }
  })

  return (
    <div className="mt-7 lg:mt-14">
      <h1 className="font-semibold text-sm text-white lg:pt-1.5 mb-6">
        Daily forecast
      </h1>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-7 lg:mt-2">
        {!dailyWeatherInfo
          ? [...Array(7)].map((_, index) => <ForecastSkeleton key={index} />)
          : arrayForDailyWeatherInfo?.map((forecast, index) => {
              const Icon = iconBank[getWeatherIconName(forecast.weather_code)]
              return (
                <div
                  key={index}
                  className="flex flex-col justify-center py-4 px-2 space-y-4 bg-ch-neutral-800 border border-ch-neutral-600 rounded-lg h-[165px] w-full overflow-x-hidden"
                >
                  {isLoadingWeatherData ? (
                    ''
                  ) : (
                    <>
                      <h1 className="text-white capitalize text-xs text-center font-normal">
                        {getDay(forecast.time).slice(0, 3)}
                      </h1>
                      <span className="mx-auto">
                        <Icon
                          svgWidth="61"
                          svgHeight="60"
                          rectWidth="50"
                          rectHeight="50"
                        />
                      </span>
                      <div className="flex justify-between leading-none">
                        <h1 className="text-xs text-white font-light">
                          {forecast.temperature_2m_min}
                          {'°'}
                        </h1>
                        <p className="text-ch-grey text-xs">
                          {forecast.temperature_2m_max}°
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )
            })}
      </div>
    </div>
  )
}

export default Forecast
