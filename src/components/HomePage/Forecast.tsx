import { ForeCastDetails } from '../../data/WeatherDeatails'

const Forecast = () => {
  return (
    <div className="mt-7 lg:mt-14">
      <h1 className="font-semibold text-sm text-white lg:pt-1.5 mb-3">
        Daily forecast
      </h1>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-7 lg:mt-2">
        {ForeCastDetails.map((forecast, index) => (
          <div
            key={index}
            className="flex flex-col justify-center py-4 px-2 space-y-4 bg-ch-neutral-800 border border-ch-neutral-600 rounded-lg h-[165px] w-full overflow-x-hidden"
          >
            <h1 className="text-white capitalize text-xs text-center font-normal">
              {forecast.day}
            </h1>
            <span className="mx-auto">
              {
                <forecast.icon
                  svgWidth="61"
                  svgHeight="60"
                  rectWidth="50"
                  rectHeight="50"
                />
              }
            </span>
            <div className="flex justify-between leading-none">
              <h1 className="text-xs text-white font-light">
                {forecast.maxTemp}{' '}
              </h1>
              <p className="text-ch-grey text-xs">{forecast.maxTemp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Forecast
