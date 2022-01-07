const initialState = {
  items: [],
}

const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'snackbar/reset-state':
      return initialState
    case 'snackbar/append': {
      const { data } = action.payload
      return {
        ...state,
        items: [
          ...state.items,
          data,
        ]
      }
    }
    case 'snackbar/destroy': {
      const { id } = action.payload
      return {
        ...state,
        items: state.items.filter(item => item.id !== id)
      }
    }
    case 'snackbar/save-size': {
      const { id, size } = action.payload

      return {
        ...state,
        items: state.items.map(item => item.id === id ? { ...item, size } : item),
      }
    }
    default:
      return state
  }
}


export default snackbarReducer