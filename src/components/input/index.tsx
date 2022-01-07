import classNames from "classnames";
import { ComponentProps, forwardRef, KeyboardEvent } from "react";
import InputNumber from "./input-number";
import InputTags from "./input-tags";
import InputTextArea from "./input-text-area";

interface InputProps extends ComponentProps<'input'>{
  variant?: 'default' | 'danger',
  onPressEnter: (e: KeyboardEvent<HTMLInputElement>) => void,
}

interface InputComponent extends React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>> {
  Tags: typeof InputTags,
  TextArea: typeof InputTextArea,
  Number: typeof InputNumber,
}
const INPUT_VARIANT_CLASSNAMES = {
  default: 'border-gray-300 focus:ring focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50',
  danger: 'border-red-600 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50'
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ type = 'text', variant = 'default', className, onPressEnter, onKeyPress, ...props}, ref) => {
  const inputClassNames = classNames(
    'block w-full rounded-md shadow-sm',
    INPUT_VARIANT_CLASSNAMES[variant],
    className,
  )

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') onPressEnter && onPressEnter(e)
    onKeyPress && onKeyPress(e)
  }
  
  return (
    <input 
      type={type}
      className={inputClassNames}
      onKeyPress={handleKeyPress}
      ref={ref}
      {...props}
    />
  )
}) as InputComponent

Input.Tags = InputTags
Input.TextArea = InputTextArea
Input.Number = InputNumber

export default Input