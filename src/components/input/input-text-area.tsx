import classNames from "classnames";
import { ComponentProps, forwardRef } from "react";

interface InputTextAreaProps extends ComponentProps<'textarea'> {
  variant?: 'default' | 'danger'
}
const INPUT_VARIANT_CLASSNAMES = {
  default: 'border-gray-300 focus:ring focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50',
  danger: 'border-red-600 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50'
}

const InputTextArea = forwardRef<HTMLTextAreaElement, InputTextAreaProps>(({ variant = 'default', className, ...props }, ref) => {
  const inputClassNames = classNames(
    'block w-full rounded-md shadow-sm',
    INPUT_VARIANT_CLASSNAMES[variant],
    className,
  )
  return (
    <textarea
      className={inputClassNames}
      ref={ref}
      {...props}
    />
  )
})

export default InputTextArea