import classNames from "classnames";
import { Component } from "react";
import { MenuItemProps } from './menu-item'

interface MenuProps{
  direction?: 'vertical' | 'horizontal',
  children?: Component<MenuItemProps>[]
}

export default function Menu({ direction='vertical', children }: MenuProps){
  return (
    <div className={classNames('relative flex', direction === 'vertical' ? 'flex-col' : 'flex-row')}>{children}</div>
  )
}