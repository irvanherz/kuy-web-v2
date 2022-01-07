import { createContext, CSSProperties } from "react";
import { SnackbarProps } from "./snackbar-provider";

interface SnackbarContextValue{
  snackbars: SnackbarProps[],
  append: (snack: SnackbarProps) => void,
  destroy: (id: number) => void,
  update: (data: SnackbarProps) => void,
  className?: string,
  style?: CSSProperties,
  containerClassName?: string,
  containerStyle?: CSSProperties,
}
const SnackbarContext = createContext<SnackbarContextValue>({
  snackbars: [],
  append: snack => { },
  destroy: id => { },
  update: snack => { },
  className: '',
  style: {},
})

export default SnackbarContext