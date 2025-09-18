import type { ReactNode } from 'react'

interface InfoCardProp {
  title: string
  value: string
  height: string
  icon?: string | ReactNode
  secondValue?: string
  className?: string
}

const InfoCard = ({ title, value, height, icon, className }: InfoCardProp) => {
  return (
    <div
      className={`${className} flex flex-col justify-center p-4 space-y-6 bg-ch-neutral-800 border border-ch-neutral-600 rounded-lg h-[${height}px] w-full overflow-x-hidden`}
    >
      <h1 className="text-ch-light-grey capitalize text-xs font-normal">
        {title}
      </h1>
      {icon && <span className="w-5">{icon}</span>}
      <h1 className="text-lg text-white font-light leading-none overflow-hidden">
        {value}
      </h1>
    </div>
  )
}

export default InfoCard
