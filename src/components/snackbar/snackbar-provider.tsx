import { CSSProperties, ReactNode, useContext, useState } from "react";
import SnackbarContext from "./context";
import SnackbarItem from "./snackbar-item";
import SnackbarItems from "./snackbar-items";

export interface SnackbarProps{
  id: number,
  title: string,
  description?: string,
  ttl?: number,
}

export interface SnackbarProviderProps {
  children?: ReactNode,
  className?: string,
  style?: CSSProperties,
  containerClassName?: string,
  containerStyle?: CSSProperties,
}

export default function SnackbarProvider({ children, style, className, containerClassName, containerStyle }: SnackbarProviderProps){
  const [snackbars, setSnackbars] = useState<SnackbarProps[]>([])

  const append = (snack: SnackbarProps) => {
    setSnackbars([...snackbars, snack])
  }

  const update = (snack: SnackbarProps) => {
    setSnackbars(snackbars => {
      const targetIndex = snackbars.findIndex(x => x.id === snack.id)
      if (targetIndex !== -1) {
        const newSnackbars = [...snackbars]
        newSnackbars[targetIndex] = { ...newSnackbars[targetIndex], ...snack}
        return newSnackbars
      }
      return snackbars
    })
  }

  const destroy = (id:number) => {
    setSnackbars(snackbars => snackbars.filter(snack => (snack.id !== id)))
  }

  return (
    <SnackbarContext.Provider 
      value={{
        snackbars,
        append,
        destroy,
        update,
        style,
        className,
        containerClassName,
        containerStyle,
      }}
    >
      {children}
      <SnackbarItems />
    </SnackbarContext.Provider>
  )
}