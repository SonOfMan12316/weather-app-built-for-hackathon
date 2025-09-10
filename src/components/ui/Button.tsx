import {
  type ButtonHTMLAttributes,
  type Ref,
  forwardRef,
  type ReactNode,
} from 'react'
import classname from 'classnames'
import { Loading } from '../icons'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
  variant?: 'primary'
  type?: 'button'
  loading?: boolean
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const Button = forwardRef(
  (
    {
      children,
      className,
      variant = 'primary',
      type = 'button',
      loading,
      disabled,
      size = 'md',
      ...rest
    }: ButtonProps,
    ref?: Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        className={classname(
          className,
          'w-full p-2 font-medium rounded-md focus:outline focus:outline-2 focus-outline-ch-light-blue active:-translate-y-0.5 outline-none transition-all ease-in-out disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-ch-light-blue hover:bg-ch-dark-blue text-white':
              variant === 'primary',
          },
          { 'text-base md:text-lg': size === 'lg' },
          { 'text-sm md:text-base': size === 'md' },
          { 'text-sm': size === 'sm' },
          { 'text-xs': size === 'xs' },
          {
            'hover:-translate-y-0.5 active:scale-95 duration-[400ms] ease-in-out':
              variant === 'primary',
          }
        )}
        type={type}
        disabled={loading || disabled}
        ref={ref}
        {...rest}
      >
        {loading ? <Loading /> : children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
