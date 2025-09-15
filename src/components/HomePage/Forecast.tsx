import { ForeCastDetails } from '../../data/WeatherDeatails'
import InfoCard from '../global/InfoCard'

const Forecast = () => {
  return (
    <div>
      <h1 className="font-bold">Daily Forecast</h1>
      <div className="grid grid-cols-3 gap-3">
        {ForeCastDetails.map((forecast, index) => (
          <InfoCard
            key={index}
            className="my-4"
            title={forecast.day}
            height="165"
            value={forecast.maxTemp}
            secondValue={forecast.minTemp}
            icon={<forecast.icon />}
          />
        ))}
      </div>
    </div>
  )
}

export default Forecast
