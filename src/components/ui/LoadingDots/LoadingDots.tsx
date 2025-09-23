import classnames from 'classnames'

import s from './LoadingDots.module.css'

interface LoadingDotsProps {
  size?: 'default' | 'sm'
}

const LoadingDots = ({ size = 'default' }: LoadingDotsProps) => {
  return (
    <span className={s.root}>
      {[...Array(3)].map((_, idx) => (
        <span
          className={classnames(s.dot, { [s.smallDot]: size === 'sm' })}
          key={`dot_${idx + 1}`}
        />
      ))}
    </span>
  )
}

export default LoadingDots
