import { Sun } from '../icons'
import { WeatherDetails } from '../../data/WeatherDeatails'
import InfoCard from '../global/InfoCard'

const WeatherInfo = () => {
  return (
    <div className="">
      <div className="bg-mobileBg md:bg-desktopBg mt-4 md:mt-6 py-auto sm:px-4 mb-3.5 bg-cover bg-no-repeat h-[220px] rounded-b-3xl flex flex-col sm:flex-row justify-center sm:justify-between items-center text-white">
        <div>
          <h1 className="font-semibold text-base">Berlin, Germany</h1>
          <h2 className="text-xs font-light text-center md:text-start text-white">
            Tuesday, Aug 5, 2025
          </h2>
        </div>
        <div className="flex items-center">
          <Sun />
          <h3 className="font-semibold text-4xl italic">68°</h3>
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
