import type { ReactNode } from 'react'

interface InfoCardProp {
  title: string
  value: string
  height: string
  icon?: string | ReactNode
  secondValue?: string
  className?: string
}

const InfoCard = ({
  title,
  value,
  height,
  icon,
  secondValue,
  className,
}: InfoCardProp) => {
  return (
    <div
      className={`${className} flex flex-col justify-center px-4 bg-ch-neutral-800 border border-ch-neutral-600 rounded-lg h-[${height}px] w-full overflow-x-hidden`}
    >
      <h1 className="text-ch-light-grey capitalize text-xs font-normal mb-2.5">
        {title}
      </h1>
      {icon && <span className="w-5">{icon}</span>}
      <h2 className="text-lg text-white font-light">
        {value}{' '}
        {secondValue && (
          <span className="text-ch-grey text-sm">{secondValue}</span>
        )}
      </h2>
    </div>
  )
}

export default InfoCard
