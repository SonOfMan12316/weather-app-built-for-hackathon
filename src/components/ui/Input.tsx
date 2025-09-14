import {
  forwardRef,
  type InputHTMLAttributes,
  useRef,
  type ReactNode,
} from 'react'
import classnames from 'classnames'
import { useMergeRefs } from 'react-merge-refs'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  icon?: string | ReactNode
  placement?: 'start' | 'end'
  variant?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    placeholder,
    icon,
    type = 'text',
    placement = 'start',
    variant,
    ...rest
  } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const mergeRefs = useMergeRefs([ref, inputRef])

  const inputWrapperClass = classnames(
    'w-full h-fit relative rounded-lg focus-within:ring-2 focus-within:ring-ch-white'
  )

  const inputClass = classnames(
    'w-full h-11 p-2 text-ch-lighter-grey text-xs text-white focus:outline-none placeholder:text-xs rounded-lg placeholder:font-medium',
    {
      '!pl-12': icon && placement === 'start',
      '!pr-12': icon && placement === 'end',
      'bg-ch-neutral-800 placeholder:text-ch-grey border-none':
        variant === 'search',
    }
  )

  const iconClass = classnames('absolute -translate-y-1/2 top-1/2 mt-[0,5px]', {
    'font-medium': typeof icon === 'string',
    'ml-4 left-0': placement === 'start',
    'mr-4 right-0': placement === 'end',
  })

  return (
    <div className={inputWrapperClass}>
      {icon && <span className={iconClass}>{icon}</span>}
      <input
        {...rest}
        className={inputClass}
        placeholder={placeholder}
        type={type}
        autoComplete="on"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        ref={mergeRefs}
      />
    </div>
  )
})

Input.displayName = 'Input'

export default Input
