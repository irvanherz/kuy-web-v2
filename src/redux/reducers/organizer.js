const initialState = {
  dataById: {},
  queryById: {},
  mutationById: {},
  queryByHash: {},
}

export default function organizerReducer(state = initialState, action){
  switch (action.type) {
    case 'organizer/reset-state':
      return initialState
    case 'organizer/fetch-details/pending': {
      const { id } = action.payload.meta
      return {
        ...state,
        queryById: {
          ...state.queryById,
          [id]: {
            status: 'loading',
          }
        }
      }
    }
    case 'organizer/fetch-details/fulfilled': {
      const { meta, data } = action.payload
      const { id } = meta
      return {
        ...state,
        dataById: {
          ...state.dataById,
          [id]: data,
        },
        queryById: {
          ...state.queryById,
          [id]: {
            status: 'succeeded',
          }
        }
      }
    }
    case 'organizer/fetch-details/rejected': {
      const { meta, error } = action.payload
      const { id } = meta
      return {
        ...state,
        queryById: {
          ...state.queryById,
          [id]: {
            status: 'failed',
            error,
          }
        }
      }
    }



    case 'organizer/create/pending': {
      return {
        ...state,
        mutationById: {
          ...state.mutationById,
          0: {
            status: 'loading',
          }
        }
      }
    }
    case 'organizer/create/fulfilled': {
      const { data } = action.payload
      return {
        ...state,
        dataById: {
          ...state.dataById,
          [data.id]: data,
        },
        mutationById: {
          ...state.mutationById,
          0: {
            status: 'succeeded',
          }
        }
      }
    }
    case 'organizer/create/rejected': {
      const { error } = action.payload
      return {
        ...state,
        mutationById: {
          ...state.mutationById,
          0: {
            status: 'failed',
            error,
          }
        }
      }
    }



    case 'organizer/delete/pending': {
      const { id } = action.payload.meta
      return {
        ...state,
        mutationById: {
          ...state.mutationById,
          [id]: {
            status: 'loading',
          }
        }
      }
    }
    case 'organizer/delete/fulfilled': {
      const { meta, data } = action.payload
      const { id } = meta
      return {
        ...state,
        dataById: {
          ...state.dataById,
          [id]: null,
        },
        mutationById: {
          ...state.mutationById,
          [id]: {
            status: 'succeeded',
          }
        }
      }
    }
    case 'organizer/delete/rejected': {
      const { meta, error } = action.payload
      const { id } = meta
      return {
        ...state,
        mutationById: {
          ...state.mutationById,
          [id]: {
            status: 'failed',
            error,
          }
        }
      }
    }


    case 'organizer/fetch-list/pending': {
      const { hash } = action.payload.meta
      return {
        ...state,
        queryByHash: {
          ...state.queryByHash,
          [hash]: {
            status: 'loading',
          }
        }
      }
    }
    case 'organizer/fetch-list/fulfilled': {
      const { hash } = action.payload.meta
      const { dataMap, dataIds } = action.payload.data.reduce((a, c) => {
        a.dataMap[c.id] = c
        a.dataIds.push(c.id)
        return a
      }, { dataMap: {}, dataIds: [] })
      return {
        ...state,
        dataById: {
          ...state.dataById,
          ...dataMap,
        },
        queryByHash: {
          ...state.queryByHash,
          [hash]: {
            status: 'succeeded',
            data: dataIds,
            dataIds,
            meta: action.payload.meta,
          }
        }
      }
    }
    case 'organizer/fetch-list/rejected': {
      const { hash } = action.payload.meta
      return {
        ...state,
        queryByHash: {
          ...state.queryByHash,
          [hash]: {
            status: 'error',
            error: action.payload.error,
          }
        }
      }
    }

    default:
      return state
  }
}