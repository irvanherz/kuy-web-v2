import classNames from "classnames";
import { ChangeEvent, ComponentProps, useMemo, useState } from "react";

interface NumberInputProps extends Omit<ComponentProps<'input'>, 'onChange' | 'value' | 'defaultValue'> {
  onChange?: (value: number) => void,
  value?: number,
  defaultValue?: number,
  min?: number,
  max?: number,
  step?: number,
}

export default function NumberInput({ value, defaultValue, step=1, onChange }: NumberInputProps) {
  const [internalValue, setInternalValue] = useState<number>()
  const computedValue = useMemo(() => {
    let res = value === undefined ? internalValue : +value
    res = res === undefined ? defaultValue : res
    return res || 0
  }, [value, defaultValue, internalValue])
  const [isFocus, setIsFocus] = useState(false)

  const triggerChange = (newValue: number) => {
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const handlePlus = () => triggerChange(computedValue + step)
  const handleMinus = () => triggerChange(computedValue - step)
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => triggerChange(+e.target.value)
  return (
    <div className={classNames('block w-full rounded-md shadow-sm relative border-gray-300', isFocus && 'ring border-indigo-300 ring-indigo-200 ring-opacity-50')}>
      <input onChange={handleChange} value={computedValue} type='text' inputMode='numeric' onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)}/>
      <div className={classNames('absolute right-0 top-0 bottom-0')}>
        <button className='block' onClick={handlePlus}>+</button>
        <button className='block' onClick={handleMinus}>-</button>
      </div>
    </div>
  )
}