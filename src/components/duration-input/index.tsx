import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { ChangeEvent, useMemo, useState } from "react";
import Input from "../input";
import NumberInput from "../number-input";
import moment from 'moment-timezone'

const INPUT_DURATION_VARIANT_CLASSNAMES = {
  default: 'border border-gray-300 rounded-md shadow-sm focus-within:ring focus-within:border-indigo-300 focus-within:ring-indigo-200 focus-within:ring-opacity-50',
  danger: 'border border-red-600 rounded-md shadow-sm focus-within:border-red-300 focus-within:ring focus-within:ring-red-200 focus-within:ring-opacity-50'
}

interface InputDurationProps {
  value?: string,
  defaultValue?: string,
  onChange?: (value: string) => void,
  variant?: 'default' | 'danger',
  className?: string,
}

export default function DurationInput({ value, defaultValue, onChange, variant = 'default', className }: InputDurationProps) {
  const [internalValue, setInternalValue] = useState<string>()
  const inputDurationClassNames = classNames(
    'flex divide-x w-min',
    INPUT_DURATION_VARIANT_CLASSNAMES[variant],
    className,
  )
  const computedValue = useMemo<moment.Duration | undefined>(() => {
    let val = value === undefined ? internalValue : value
    val = val === undefined ? defaultValue : val
    return val ? moment.duration(val) : undefined
  }, [value, defaultValue, internalValue])

  const computedValueEx = useMemo(() => {
    const val = { days: 0, hours: 0, minutes: 0 }
    val.days = Math.floor(computedValue?.asDays() || 0)
    val.hours = computedValue?.hours() || 0
    val.minutes = computedValue?.minutes() || 0
    return val
  }, [computedValue])

  const triggerChange = (newValue: string) => {
    if(value === undefined) setInternalValue(newValue)
    onChange && onChange(newValue)
  }

  const handleChange = (v: string, k: 'days' | 'hours' | 'minutes') => {
    v = v.replace(/\D/g, '')
    const val = +v || 0
    const d = moment.duration({...computedValueEx, [k]: val})
    const hours = `${Math.floor(d.asHours() || 0)}`.padStart(2, '0')
    const minutes = `${d.minutes() || 0}`.padStart(2, '0')
    let newVal = `${hours}:${minutes}:00`
    if (moment.duration(newVal).asSeconds() < 0) newVal = '00:00:00'
    triggerChange(newVal)
  }

  const handleIncrement = (v: number, k: 'days' | 'hours' | 'minutes') => {
    const d = moment.duration({ ...computedValueEx, [k]: computedValueEx[k] + v })
    const hours = `${Math.floor(d.asHours() || 0)}`.padStart(2, '0')
    const minutes = `${d.minutes() || 0}`.padStart(2, '0')
    let newVal = `${hours}:${minutes}:00`
    if (moment.duration(newVal).asSeconds() < 0) newVal = '00:00:00'
    triggerChange(newVal)
  }


  return (
    <div className={inputDurationClassNames} style={{ minWidth: 300 }}>
      <div className='flex flex-col items-center w-1/3'>
        <button type='button' onClick={() => handleIncrement(1, 'days')}className='rounded-tl-md border-b block w-full text-center bg-gray-50'><ChevronUpIcon className='inline text-gray-700 w-3 h-3' /></button>
        <input onChange={e => handleChange(e.target.value, 'days')} value={computedValueEx.days + ' hari'} type='text' inputMode='numeric' className='w-full inline-block bg-transparent border-0 focus:ring-0 px-2 py-1 text-center' />
        <button type='button' onClick={() => handleIncrement(-1, 'days')} className='rounded-bl-md border-t block w-full text-center bg-gray-50'><ChevronDownIcon className='inline text-gray-700 w-3 h-3' /></button>
      </div>
      <div className='flex flex-col items-center w-1/3'>
        <button type='button' onClick={() => handleIncrement(1, 'hours')} className='border-b block w-full text-center bg-gray-50'><ChevronUpIcon className='inline text-gray-700 w-3 h-3' /></button>
        <input onChange={e => handleChange(e.target.value, 'hours')} value={computedValueEx.hours + ' jam'} type='text' inputMode='numeric' className='w-full inline-block bg-transparent border-0 focus:ring-0 px-2 py-1 text-center' />
        <button type='button' onClick={() => handleIncrement(-1, 'hours')} className='border-t block w-full text-center bg-gray-50'><ChevronDownIcon className='inline text-gray-700 w-3 h-3' /></button>
      </div>
      <div className='flex flex-col items-center w-1/3'>
        <button type='button' onClick={() => handleIncrement(1, 'minutes')} className='rounded-tr-md border-b block w-full text-center bg-gray-50'><ChevronUpIcon className='inline text-gray-700 w-3 h-3' /></button>
        <input onChange={e => handleChange(e.target.value, 'minutes')} value={computedValueEx.minutes + ' menit'} type='text' inputMode='numeric' className='w-full inline-block bg-transparent border-0 focus:ring-0 px-2 py-1 text-center' />
        <button type='button' onClick={() => handleIncrement(-1, 'minutes')} className='rounded-br-md border-t block w-full text-center bg-gray-50'><ChevronDownIcon className='inline text-gray-700 w-3 h-3' /></button>
      </div>
    </div>
  )
}