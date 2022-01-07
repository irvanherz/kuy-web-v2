import { useContext } from "react"
import { SnackbarProps } from "./snackbar-provider"
import SnackbarContext from "./context"

export default function useSnackbar(){
  const context = useContext(SnackbarContext)

  const show = (snack: SnackbarProps) => {
    const id = Date.now()
    snack.id = id
    context.append(snack)
    return id
  }
  const destroy = (id: number) => {
    context.destroy(id)
  }
  return {
    snackbars: context.snackbars,
    show,
    destroy,
  }
}