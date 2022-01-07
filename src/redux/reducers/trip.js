const initialState = {
  dataById: {},
  queryById: {},
  mutationById: {},
  queryByHash: {},
}

export default function organizerReducer(state = initialState, action) {
  switch (action.type) {
    case 'trip/reset-state':
      return initialState

    case 'trip/fetch-details/pending': {
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
    case 'trip/fetch-details/fulfilled': {
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
    case 'trip/fetch-details/rejected': {
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

    case 'trip/create/pending': {
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
    case 'trip/create/fulfilled': {
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
    case 'trip/create/rejected': {
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

    case 'trip/update/pending': {
      const { meta } = action.payload
      const { id } = meta
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
    case 'trip/update/fulfilled': {
      const { data, meta } = action.payload
      const { id } = meta
      return {
        ...state,
        dataById: {
          ...state.dataById,
          [id]: { ...state.dataById[id], ...data },
        },
        mutationById: {
          ...state.mutationById,
          [id]: {
            status: 'succeeded',
          }
        }
      }
    }
    case 'trip/update/rejected': {
      const { error, meta } = action.payload
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

    case 'trip/delete/pending': {
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
    case 'trip/delete/fulfilled': {
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
    case 'trip/delete/rejected': {
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


    case 'trip/fetch-list/pending': {
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
    case 'trip/fetch-list/fulfilled': {
      const { meta, data } = action.payload
      const { hash } = meta
      const { dataMap, dataIds } = data.reduce((a, c) => {
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
            meta: meta,
          }
        }
      }
    }
    case 'trip/fetch-list/rejected': {
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