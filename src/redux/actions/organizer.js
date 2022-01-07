

import { API_BASE_URL } from "../../config"
import axios from "../../config/axios"


const fetchOrganizerListPending = (meta) => ({
  type: 'organizer/fetch-list/pending',
  payload: { meta },
})

const fetchOrganizerListFulfilled = (data, meta) => ({
  type: 'organizer/fetch-list/fulfilled',
  payload: { data, meta },
})

const fetchOrganizerListRejected = (error, meta) => ({
  type: 'organizer/fetch-list/rejected',
  payload: { error, meta },
})

export const fetchOrganizerList = (filters = {}, hash) => {
  const requestMeta = { filters, hash }
  return (dispatch, getState) => {
    dispatch(fetchOrganizerListPending(requestMeta))
    return axios.get(`${API_BASE_URL}/organizers`, { params: filters })
      .then(response => {
        const { data, meta } = response.data
        dispatch(fetchOrganizerListFulfilled(data, { ...requestMeta, ...meta }))
        return data
      }, error => {
        console.log(error);
        dispatch(fetchOrganizerListRejected(error.response.data.error))
        return false
      })
  }
}


// const fetchOrganizerDetailsPending = (meta) => ({
//   type: 'organizer/fetch-details/pending',
//   payload: { meta }
// })

// const fetchOrganizerDetailsFulfilled = (data, meta) => ({
//   type: 'organizer/fetch-details/fulfilled',
//   payload: { data, meta }
// })

// const fetchOrganizerDetailsRejected = (error, meta) => ({
//   type: 'organizer/fetch-details/rejected',
//   payload: { error, meta }
// })

// export const fetchOrganizerDetails = (kuyId, userId) => {
//   const hash = `${kuyId}-${userId}`
//   const meta = { kuyId, userId, hash }

//   return (dispatch, getState) => {
//     dispatch(fetchOrganizerDetailsPending(meta))
//     return axios.get(`${API_BASE_URL}/api/v1/kuys/${kuyId}/favorites/${userId}`)
//       .then(response => {
//         const data = response.data.data
//         dispatch(fetchOrganizerDetailsFulfilled(data, meta))
//         return data
//       })
//       .catch(error => {
//         dispatch(fetchOrganizerDetailsRejected(error.response.data.error, meta))
//         return false
//       })
//   }
// }

const createOrganizerPending = (meta) => ({
  type: 'organizer/create/pending',
  payload: { meta }
})

const createOrganizerFulfilled = (data, meta) => ({
  type: 'organizer/create/fulfilled',
  payload: { data, meta }
})

const createOrganizerRejected = (error, meta) => ({
  type: 'organizer/create/rejected',
  payload: { error, meta }
})

export const createOrganizer = data => {
  return (dispatch, getState) => {
    dispatch(createOrganizerPending())
    return axios.post(`${API_BASE_URL}/organizers`, data)
      .then(response => {
        const data = response.data.data
        const meta = { id: data.id }
        dispatch(createOrganizerFulfilled(data, meta))
        return data
      })
      .catch(error => {
        dispatch(createOrganizerRejected(error.response.data.error))
        return false
      })
  }
}