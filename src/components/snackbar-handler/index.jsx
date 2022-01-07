import { useSelector } from "react-redux"
import { showSnackbar } from "../../helper/snackbar"
import Snackbar from "./snackbar"

export default function SnackbarHandler() {
  const snackbarItems = useSelector(state => state.snackbar.items)

  const handleAdd = () => {
    const t = Date.now()
    if(t % 2)
      showSnackbar({ title: `Show Snackbar ${Date.now()}`, timeout: 50 })
    else 
      showSnackbar({ title: <><div>a</div><div>{`Show Snackbar${Date.now()}`}</div></>, description:'Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet', timeout: 50 })
  }

  const renderSnackbars = () => {
    const { snackbars } = snackbarItems.reduce((a, c, i) => {
      a.snackbars.push(
        <Snackbar snackbar={c} style={{ top: a.nextTop }}/>
      )
      a.nextTop += c?.size?.height || 50
      return a
    }, { snackbars: [], nextTop: 72 })
    return snackbars
  }
  return (
    <>
      {renderSnackbars()}
      <button onClick={handleAdd}>Add</button>
    </>
  )
}