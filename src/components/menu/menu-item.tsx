import { Component, ReactNode } from "react";

export interface MenuItemProps{
  children?: ReactNode | Component<MenuItemProps>[]
}
export default function MenuItem({ children }: MenuItemProps) {
  return (
    <div className='relative'>{children}</div>
  )
}