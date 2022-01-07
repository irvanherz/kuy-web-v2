import classNames from "classnames";
import { ComponentProps, useState } from "react";
import './index.css'

export interface SwitchProps extends Omit<ComponentProps<'input'>, 'type'>{}
export default function Switch({ className, ...props }: SwitchProps){
  const [componentId] = useState(Date.now().toString())
  return (
    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
      <input type="checkbox" id={componentId} className="switch" />
      <label htmlFor={componentId} />
    </div>
  )
}