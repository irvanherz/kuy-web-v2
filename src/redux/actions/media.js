

import { API_BASE_URL } from "../../config"
import axios from "../../config/axios"


const fetchMediaListPending = (meta) => ({
  type: 'media/fetch-list/pending',
  payload: { meta },
})

const fetchMediaListFulfilled = (data, meta) => ({
  type: 'media/fetch-list/fulfilled',
  payload: { data, meta },
})

const fetchMediaListRejected = (error, meta) => ({
  type: 'media/fetch-list/rejected',
  payload: { error, meta },
})

export const fetchMediaList = (filters = {}, hash) => {
  const requestMeta = { filters, hash }
  return (dispatch, getState) => {
    dispatch(fetchMediaListPending(requestMeta))
    return axios.get(`${API_BASE_URL}/medias`, { params: filters })
      .then(response => {
        const { data, meta } = response.data
        dispatch(fetchMediaListFulfilled(data, { ...requestMeta, ...meta }))
        return data
      }, error => {
        console.log(error);
        dispatch(fetchMediaListRejected(error.response.data.error))
        return false
      })
  }
}

const createMediaPending = (meta) => ({
  type: 'media/create/pending',
  payload: { meta }
})

const createMediaFulfilled = (data, meta) => ({
  type: 'media/create/fulfilled',
  payload: { data, meta }
})

const createMediaRejected = (error, meta) => ({
  type: 'media/create/rejected',
  payload: { error, meta }
})

export const createMedia = data => {
  return (dispatch, getState) => {
    dispatch(createMediaPending())
    return axios.post(`${API_BASE_URL}/medias`, data)
      .then(response => {
        const data = response.data.data
        const meta = { id: data.id }
        dispatch(createMediaFulfilled(data, meta))
        return data
      })
      .catch(error => {
        dispatch(createMediaRejected(error.response.data.error))
        return false
      })
  }
}