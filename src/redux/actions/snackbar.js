export const appendSnackbar = (data) => ({
  type: 'snackbar/append',
  payload: { data },
})

export const destroySnackbar = id => ({
  type: 'snackbar/destroy',
  payload: { id },
})

export const saveSnackbarSize = (id, size) => ({
  type: 'snackbar/save-size',
  payload: { id, size },
})
