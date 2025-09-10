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
  variant?: 'search'
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
    'w-full h-fit relative rounded-md bg-ch-neutral-800 placeholder:text-ch-light-grey border-none focus-within:ring-2 focus-within:ring-ch-white'
  )

  const inputClass = classnames(
    'w-full h-10 p-2 text-ch-lighter-grey text-sm focus:outline-none placeholder:text-xs rounded-md',
    {
      '!pl-12': icon && placement === 'start',
      '!pr-12': icon && placement === 'end',
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
