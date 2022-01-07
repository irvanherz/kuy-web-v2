import { Key, ReactNode } from "react";

export interface TabPanelProps{
  tab?: string | number,
  children?: ReactNode,
}

export default function TabPanel({ children, tab }: TabPanelProps){
  return (
    <div>
      {children}
    </div>
  )
}