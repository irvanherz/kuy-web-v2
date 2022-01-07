import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { ChangeEvent, ComponentProps, forwardRef, useMemo, useState } from "react";

interface InputNumberProps extends Omit<ComponentProps<'input'>, 'type' | 'value' | 'defaultValue' | 'onChange'> {
  variant?: 'default' | 'danger',
  value?: number | string | null,
  defaultValue?: number,
  onChange?: (value:number) => void,
  step?: number,
  min?: number,
  max?: number,
  step?: number,
}
const INPUT_VARIANT_CLASSNAMES = {
  default: 'border-gray-300 focus-within:ring focus-within:border-indigo-300 focus-within:ring-indigo-200 focus-within:ring-opacity-50',
  danger: 'border-red-600 focus-within:border-red-300 focus-within:ring focus-within:ring-red-200 focus-within:ring-opacity-50'
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(({ step=1, min=0, max, value, defaultValue, onChange, variant = 'default', className, ...props }, ref) => {
  const [internalValue, setInternalValue] = useState<number>()

  const computedValue = useMemo<number>(() => {
    let v = value === undefined ? internalValue : value
    v = v === undefined ? defaultValue : v
    return Number(v) || 0
  }, [defaultValue, internalValue, value])

  const inputClassNames = classNames(
    'flex items-center w-min block rounded-md shadow-sm border',
    INPUT_VARIANT_CLASSNAMES[variant],
    className,
  )

  const triggerChange = (newValue: number) => {
    if(value === undefined) setInternalValue(newValue)
    onChange && onChange(newValue)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '')
    let v = Number(val) || 0
    v = (min !== undefined && v < min) ? min : v
    v = (max !== undefined && v > max) ? max : v
    triggerChange(v)
  }

  const handleIncrement = (amount: number) => {
    let v = computedValue + amount * step
    v = (min !== undefined && v < min) ? min : v
    v = (max !== undefined && v > max) ? max : v
    triggerChange(v)
  }

  return (
    <div 
      className={inputClassNames}
    >
      <div>
        <button className='p-2' type='button' onClick={() => handleIncrement(-1)}><MinusCircleIcon className='w-5 h-5 text-green-600' /></button>
      </div>
      <input
        value={computedValue}
        onChange={handleChange}
        inputMode='numeric'
        type='text'
        className='inline-block bg-transparent border-0 focus:ring-0 flex-grow text-center font-bold'
        ref={ref}
        {...props}
      />
      <div>
        <button className='p-2' type='button' onClick={() => handleIncrement(1)}><PlusCircleIcon className='w-5 h-5 text-green-600' /></button>
      </div>
    </div>
  )
})

export default InputNumber