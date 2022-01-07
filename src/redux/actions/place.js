

import { API_BASE_URL } from "../../config"
import axios from "../../config/axios"


const fetchPlaceListPending = (meta) => ({
  type: 'place/fetch-list/pending',
  payload: { meta },
})

const fetchPlaceListFulfilled = (data, meta) => ({
  type: 'place/fetch-list/fulfilled',
  payload: { data, meta },
})

const fetchPlaceListRejected = (error, meta) => ({
  type: 'place/fetch-list/rejected',
  payload: { error, meta },
})

export const fetchPlaceList = (filters = {}, hash) => {
  const requestMeta = { filters, hash }
  return (dispatch, getState) => {
    dispatch(fetchPlaceListPending(requestMeta))
    return axios.get(`${API_BASE_URL}/places`, { params: filters })
      .then(response => {
        const { data, meta } = response.data
        dispatch(fetchPlaceListFulfilled(data, { ...requestMeta, ...meta }))
        return data
      }, error => {
        console.log(error);
        dispatch(fetchPlaceListRejected(error, requestMeta))
        return false
      })
  }
}


const fetchPlaceDetailsPending = (meta) => ({
  type: 'place/fetch-details/pending',
  payload: { meta }
})

const fetchPlaceDetailsFulfilled = (data, meta) => ({
  type: 'place/fetch-details/fulfilled',
  payload: { data, meta }
})

const fetchPlaceDetailsRejected = (error, meta) => ({
  type: 'place/fetch-details/rejected',
  payload: { error, meta }
})

export const fetchPlaceDetails = (id) => {
  const meta = { id }
  return (dispatch, getState) => {
    dispatch(fetchPlaceDetailsPending(meta))
    return axios.get(`${API_BASE_URL}/places/${id}`)
      .then(response => {
        const data = response.data.data
        dispatch(fetchPlaceDetailsFulfilled(data, meta))
        return data
      })
      .catch(error => {
        dispatch(fetchPlaceDetailsRejected(error, meta))
        return false
      })
  }
}

const createPlacePending = (meta) => ({
  type: 'place/create/pending',
  payload: { meta }
})

const createPlaceFulfilled = (data, meta) => ({
  type: 'place/create/fulfilled',
  payload: { data, meta }
})

const createPlaceRejected = (error, meta) => ({
  type: 'place/create/rejected',
  payload: { error, meta }
})

export const createPlace = (organizer_id, data) => {
  return (dispatch, getState) => {
    dispatch(createPlacePending())
    return axios.post(`${API_BASE_URL}/places`, data)
      .then(response => {
        const data = response.data.data
        const meta = { id: data.id }
        dispatch(createPlaceFulfilled(data, meta))
        return data
      })
      .catch(error => {
        dispatch(createPlaceRejected(error))
        return false
      })
  }
}