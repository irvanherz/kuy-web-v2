import { ComponentProps, Context, createContext, ReactNode, useState } from "react";

interface FormItemProps extends ComponentProps<'div'> {
  label?: string | ReactNode,
  description?: string | ReactNode,
  error?: string | ReactNode,
}

export default function FormItem({ children, label, error, description, ...props }: FormItemProps) {
  return (
    <div {...props}>
      <div className="mb-4">
        {
          <div className='mb-2'>
            <label className="block text-gray-700 text font-bold mb">{label}</label>
            {description ? <p className='text-sm text-gray-500'>{description}</p> : null}
          </div>
        }
        <div>
          {children}
        </div>
        {error ? <p className="text-red-500 text-sm italic">{error}</p> : null}
      </div>
    </div>
  )
}