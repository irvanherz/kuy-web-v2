const initialState = {
  dataById: {},
  queryById: {},
  mutationById: {},
  queryByHash: {},
}

export default function mediaReducer(state = initialState, action) {
  switch (action.type) {
    case 'media/reset-state':
      return initialState

    case 'media/create/pending': {
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
    case 'media/create/fulfilled': {
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
    case 'media/create/rejected': {
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



    case 'media/delete/pending': {
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
    case 'media/delete/fulfilled': {
      const { meta } = action.payload
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
    case 'media/delete/rejected': {
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


    case 'media/fetch-list/pending': {
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
    case 'media/fetch-list/fulfilled': {
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
    case 'media/fetch-list/rejected': {
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