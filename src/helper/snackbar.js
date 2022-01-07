import { appendSnackbar, destroySnackbar } from "../redux/actions/snackbar";
import { store } from "../redux/store";

export function showSnackbar({title, description, timeout=0}){
  const snackbar = { id: Date.now(), title, description, timeout }
  store.dispatch(appendSnackbar(snackbar))
}

export function hideSnackbar(id) {
  store.dispatch(destroySnackbar(id))
}

