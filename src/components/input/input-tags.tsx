import { XCircleIcon } from "@heroicons/react/solid"
import classNames from "classnames"
import { ChangeEvent, KeyboardEvent, useMemo, useState } from "react"

interface InputTagsProps {
  value?: string | string[],
  defaultValue?: string | string[],
  onChange?: (value: string[]) => void,
  variant?: 'default' | 'danger',
  className?: string,
}

const INPUT_TAGS_VARIANT_CLASSNAMES = {
  default: 'border-gray-300 focus-within:ring focus-within:border-indigo-300 focus-within:ring-indigo-200 focus-within:ring-opacity-50',
  danger: 'border-red-600 focus-within:border-red-300 focus-within:ring focus-within:ring-red-200 focus-within:ring-opacity-50'
}

export default function InputTags({ value, defaultValue, onChange, variant='default', className }: InputTagsProps) {
  const [tag, setTag] = useState('')
  const [internalValue, setInternalValue] = useState<string[]>([])
  const computedValue = useMemo<string[]>(() => {
    const valueAsArray = Array.isArray(value)
      ? value
      : typeof value === 'string'
        ? value.split(/\s*,\s*/)
          .filter(Boolean)
          .filter((itm, pos, arr) => (arr.indexOf(itm) === pos))
        : value
    const defaultValueAsArray = Array.isArray(value)
      ? defaultValue
      : typeof defaultValue === 'string'
        ? defaultValue.split(/\s*,\s*/)
          .filter(Boolean)
          .filter((itm, pos, arr) => (arr.indexOf(itm) === pos))
        : value
    let val = valueAsArray === undefined ? internalValue : valueAsArray
    val = val === undefined ? defaultValueAsArray : val
    return val || []
  }, [value, defaultValue, internalValue])

  const inputTagsClassNames = classNames(
    'flex flex-wrap p-1 border w-full rounded-md shadow-sm',
    INPUT_TAGS_VARIANT_CLASSNAMES[variant],
    className,
  )

  const triggerChange = (newValue: string[]) => {
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onChange && onChange(newValue)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val.includes(',')) {
      const newTags = val.split(/\s*,\s*/)
        .filter(Boolean)
        .filter((itm, pos, arr) => (arr.indexOf(itm) === pos))
      const mergedTags = [...computedValue, ...newTags].filter((itm, pos, arr) => (arr.indexOf(itm) === pos))
      triggerChange(mergedTags)
      setTag('')
    } else {
      setTag(val)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (tag) {
        const mergedTags = [...computedValue, tag].filter((itm, pos, arr) => (arr.indexOf(itm) === pos))
        triggerChange(mergedTags)
        setTag('')
      }
    }
  }

  const handleRemoveTag = (target: string) => {
    const newTags = computedValue.filter(tag => tag !== target)
    triggerChange(newTags)
  }

  return (
    <div className={inputTagsClassNames} style={{ maxWidth: 500 }}>
      {computedValue.map(tag => (
        <div className='inline-block p-1'>
          <div className='text-sm border rounded-full pl-3 pr-1 py-1 flex'>
            <span>{tag}</span><button className='ml-1' onClick={() => handleRemoveTag(tag)}><XCircleIcon className='w-5 h-5 text-red-400' /></button>
          </div>
        </div>
      ))}
      <input value={tag} onChange={handleChange} onKeyDown={handleKeyDown} type='text' placeholder='Tambahkan tag...' className='inline-block bg-transparent border-0 focus:ring-0 flex-grow' style={{ minWidth: 100, flexBasis: 100}} />
    </div>
  )
}