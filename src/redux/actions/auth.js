import axios from '../../config/axios'
import { API_BASE_URL } from "../../config"

export const handleAuthStateChanged = user => {
  return async dispatch => {
    const token = user ? await user.getIdToken() : null
    dispatch({
      type: 'auth/state-changed',
      payload: { token },
    })
  }
}

export const handleIdTokenChanged = user => {
  return async dispatch => {
    const token = user ? await user.getIdToken() : null
    dispatch({
      type: 'auth/id-token-changed',
      payload: { token },
    })
  }
}

const fetchProfileDetailsPending = (meta) => ({
  type: 'auth/profile/fetch-details/pending',
  payload: { meta },
})

const fetchProfileDetailsFulfilled = (data, meta) => ({
  type: 'auth/profile/fetch-details/fulfilled',
  payload: { data, meta },
})

const fetchProfileDetailsRejected = (error, meta) => ({
  type: 'auth/profile/fetch-details/rejected',
  payload: { error, meta },
})

export const fetchProfileDetails = () => {
  return (dispatch, getState) => {
    dispatch(fetchProfileDetailsPending())
    return axios.post(`${API_BASE_URL}/auth/profile`)
      .then(response => {
        const result = response.data
        dispatch(fetchProfileDetailsFulfilled(result.data, result.meta))
        return result.data
      }, error => {
        console.log(error);
        dispatch(fetchProfileDetailsRejected(error))
        return false
      })
  }
}

const setupProfilePending = (meta) => ({
  type: 'auth/profile/setup/pending',
  payload: { meta },
})

const setupProfileFulfilled = (data, meta) => ({
  type: 'auth/profile/setup/fulfilled',
  payload: { data, meta },
})

const setupProfileRejected = (error, meta) => ({
  type: 'auth/profile/setup/rejected',
  payload: { error, meta },
})

export const setupProfile = data => {
  return (dispatch, getState) => {
    dispatch(setupProfilePending())
    return axios.put(`${API_BASE_URL}/auth/profile/setup`, data)
      .then(response => {
        const result = response.data
        dispatch(setupProfileFulfilled(result.data, result.meta))
        return result.data
      }, error => {
        console.log(error);
        dispatch(setupProfileRejected(error))
        return false
      })
  }
}