const initialState = {
  status: 'idle', //idle, authenticated, unauthenticated, 
  token: null,
  profile: {
    data: null,
    meta: {},
    query: {
      status: 'idle',
      error: null,
    },
    mutation: {
      status: 'idle',
      error: null,
    }
  },
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'auth/reset-state':
      return initialState
    case 'auth/state-changed': {
      const { token } = action.payload
      return {
        ...state,
        token,
        status: token ? 'authenticated' : 'unauthenticated'
      }
    }
    case 'auth/profile/fetch-details/pending':{
      return {
        ...state,
        profile: {
          ...state.profile,
          query: {
            ...state.profile.query,
            status: 'loading',
          }
        }
      }
    }
    case 'auth/profile/fetch-details/fulfilled': {
      const { data, meta } = action.payload
      return {
        ...state,
        profile: {
          ...state.profile,
          data,
          meta,
          query: {
            ...state.profile.query,
            status: 'succeeded',
          }
        }
      }
    }
    case 'auth/profile/fetch-details/rejected': {
      const { error } = action.payload
      return {
        ...state,
        profile: {
          ...state.profile,
          data: null,
          meta: {},
          query: {
            ...state.profile.query,
            status: 'failed',
            error,
          }
        }
      }
    }

    case 'auth/profile/setup/pending': {
      return {
        ...state,
        profile: {
          ...state.profile,
          mutation: {
            ...state.profile.mutation,
            status: 'loading',
          }
        }
      }
    }
    case 'auth/profile/setup/fulfilled': {
      const { data, meta } = action.payload
      return {
        ...state,
        profile: {
          ...state.profile,
          data,
          meta,
          mutation: {
            ...state.profile.mutation,
            status: 'succeeded',
          }
        }
      }
    }
    case 'auth/profile/setup/rejected': {
      const { error } = action.payload
      return {
        ...state,
        profile: {
          ...state.profile,
          mutation: {
            ...state.profile.mutation,
            status: 'failed',
            error,
          }
        }
      }
    }
    default:
      return state
  }
}


export default authReducer