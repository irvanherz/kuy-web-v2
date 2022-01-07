import { ComponentProps } from "react";
import classNames from 'classnames'

interface ButtonProps extends ComponentProps<'button'>{
  loading: boolean,
  variant: 'primary' | 'secondary' | 'link' | 'danger' | 'danger-link' | undefined,
}

const BUTTON_VARIANT_CLASSES = {
  primary: 'bg-blue-500 hover:bg-blue-700 disabled:bg-blue-400',
  secondary: 'bg-gray-500 hover:bg-gray-700 disabled:bg-gray-400',
  danger: 'bg-red-500 hover:bg-red-700 disabled:bg-red-400',
  link: 'bg-transparent text-blue-600 hover:text-blue-500 disabled:bg-blue-300',
  'danger-link': 'bg-transparent text-red-500 hover:text-red-400 disabled:bg-blue-300',
}

export default function Button({ className, type='button', variant='primary', children, disabled, loading, ...props }: ButtonProps) {
  const buttonClassNames = classNames(
    BUTTON_VARIANT_CLASSES[variant],
    'text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
    className,
  )
  return (
    <button 
      type={type}
      disabled={disabled || loading}
      className={buttonClassNames}
      {...props}
    >
      {loading && (
        <svg className="inline animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  )
}