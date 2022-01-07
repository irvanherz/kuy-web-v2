import classNames from "classnames";
import { ChangeEvent, ComponentProps, useMemo, useState } from "react";
interface PhoneInputProps extends Omit<ComponentProps<'input'>, 'type' | 'onChange' | 'defaultValue' | 'value'> {
  defaultValue: string,
  value: string,
  onChange: (value: string) => void,
  variant: 'default' | 'danger',
}

const PHONE_INPUT_VARIANT_CLASSNAMES = {
  default: 'border-gray-300 focus:ring focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50',
  danger: 'border-red-600 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50',
}

export default function PhoneInput({ variant='default', defaultValue, value, onChange, className, ...props}: PhoneInputProps) {
  const [internalValue, setInternalValue] = useState<string>()

  const phoneInputClassNames = classNames(
    'mb-3 block w-full rounded-md shadow-sm',
    PHONE_INPUT_VARIANT_CLASSNAMES[variant],
    className,
  )

  const computedValue = useMemo(() => {
    let res = value === undefined ? internalValue : value
    res = res === undefined ? defaultValue : res
    return res ? res.replace(/[^0-9]/, '') : ''
  }, [value, defaultValue, internalValue])

  const triggerChange = (newValue: string) => {
    newValue = newValue ? newValue.replace(/[^0-9]/, '') : newValue
    if(value === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    triggerChange(e.target.value)
  }
  return (
    <input 
      type='text' 
      defaultValue={undefined} 
      value={computedValue} 
      onChange={handleChange} 
      className={phoneInputClassNames}
      {...props} 
    />
  )
}