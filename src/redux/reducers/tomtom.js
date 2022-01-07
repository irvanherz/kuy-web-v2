const initialState = {
  poi: {
    dataById: {},
    queryByHash: {},
  },
  reverseGeocode: {
    dataById: {},
    queryById: {},
  }
}

export default function tomtomReducer(state = initialState, action) {
  switch (action.type) {
    case 'tomtom/poi/reset-state':
      return initialState
    
    case 'tomtom/poi/search/pending': {
      const { meta } = action.payload
      const { hash } = meta
      return {
        ...state,
        poi: {
          ...state.poi,
          queryByHash: {
            ...state.poi.queryByHash,
            [hash]: {
              ...state.poi.queryByHash[hash],
              status: 'loading',
            }
          }
        },
      }
    }
    case 'tomtom/poi/search/fulfilled': {
      const { meta, data } = action.payload
      const { hash } = meta
      const { dataMap, dataIds } = data.reduce((a, c) => {
        a.dataMap[c.id] = c
        a.dataIds.push(c.id)
        return a
      }, { dataMap: {}, dataIds: [] })
      return {
        ...state,
        poi: {
          ...state.poi,
          dataById: {
            ...state.poi.dataById,
            ...dataMap,
          },
          queryByHash: {
            ...state.poi.queryByHash,
            [hash]: {
              ...state.poi.queryByHash[hash],
              status: 'succeeded',
              data: dataIds,
              dataIds,
              meta,
            }
          }
        },
      }
    }
    case 'tomtom/poi/search/rejected': {
      const { meta, error } = action.payload
      const { hash } = meta
      return {
        ...state,
        queryByHash: {
          ...state.poi.queryByHash,
          [hash]: {
            ...state.poi.queryByHash[hash],
            status: 'error',
            error: error,
          }
        }
      }
    }

    case 'tomtom/reverse-geocode/search/pending': {
      const { meta } = action.payload
      const { id } = meta
      return {
        ...state,
        reverseGeocode: {
          ...state.reverseGeocode,
          queryById: {
            ...state.reverseGeocode.queryById,
            [id]: {
              ...state.reverseGeocode.queryById[id],
              status: 'loading',
            }
          }
        },
      }
    }
    case 'tomtom/reverse-geocode/search/fulfilled': {
      const { meta, data } = action.payload
      const { id } = meta
      
      return {
        ...state,
        reverseGeocode: {
          ...state.reverseGeocode,
          dataById: {
            ...state.reverseGeocode.dataById,
            [id]: data,
          },
          queryById: {
            ...state.reverseGeocode.queryById,
            [id]: {
              ...state.reverseGeocode.queryById[id],
              status: 'succeeded',
              meta,
            }
          }
        },
      }
    }
    case 'tomtom/reverse-geocode/search/rejected': {
      const { meta, error } = action.payload
      const { id } = meta
      return {
        ...state,
        queryById: {
          ...state.reverseGeocode.queryById,
          [id]: {
            ...state.reverseGeocode.queryById[id],
            status: 'error',
            error: error,
          }
        }
      }
    }

    default:
      return state
  }
}