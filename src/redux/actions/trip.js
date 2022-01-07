

import { API_BASE_URL } from "../../config"
import axios from "../../config/axios"


const fetchTripListPending = (meta) => ({
  type: 'trip/fetch-list/pending',
  payload: { meta },
})

const fetchTripListFulfilled = (data, meta) => ({
  type: 'trip/fetch-list/fulfilled',
  payload: { data, meta },
})

const fetchTripListRejected = (error, meta) => ({
  type: 'trip/fetch-list/rejected',
  payload: { error, meta },
})

export const fetchTripList = (filters = {}, hash) => {
  const requestMeta = { filters, hash }
  return (dispatch, getState) => {
    dispatch(fetchTripListPending(requestMeta))
    return axios.get(`${API_BASE_URL}/trips`, { params: filters })
      .then(response => {
        const { data, meta } = response.data
        dispatch(fetchTripListFulfilled(data, { ...requestMeta, ...meta }))
        return data
      }, error => {
        console.log(error);
        dispatch(fetchTripListRejected(error, requestMeta))
        return false
      })
  }
}


const fetchTripDetailsPending = (meta) => ({
  type: 'trip/fetch-details/pending',
  payload: { meta }
})

const fetchTripDetailsFulfilled = (data, meta) => ({
  type: 'trip/fetch-details/fulfilled',
  payload: { data, meta }
})

const fetchTripDetailsRejected = (error, meta) => ({
  type: 'trip/fetch-details/rejected',
  payload: { error, meta }
})

export const fetchTripDetails = (id) => {
  const meta = { id }
  return (dispatch, getState) => {
    dispatch(fetchTripDetailsPending(meta))
    return axios.get(`${API_BASE_URL}/trips/${id}`)
      .then(response => {
        const data = response.data.data
        dispatch(fetchTripDetailsFulfilled(data, meta))
        return data
      })
      .catch(error => {
        dispatch(fetchTripDetailsRejected(error, meta))
        return false
      })
  }
}

const createTripPending = (meta) => ({
  type: 'trip/create/pending',
  payload: { meta }
})

const createTripFulfilled = (data, meta) => ({
  type: 'trip/create/fulfilled',
  payload: { data, meta }
})

const createTripRejected = (error, meta) => ({
  type: 'trip/create/rejected',
  payload: { error, meta }
})

export const createTrip = (organizer_id, data) => {
  return (dispatch, getState) => {
    dispatch(createTripPending())
    return axios.post(`${API_BASE_URL}/organizers/${organizer_id}/trips`, data)
      .then(response => {
        const data = response.data.data
        const meta = { id: data.id }
        dispatch(createTripFulfilled(data, meta))
        return data
      })
      .catch(error => {
        dispatch(createTripRejected(error))
        return false
      })
  }
}


const updateTripPending = (meta) => ({
  type: 'trip/update/pending',
  payload: { meta }
})

const updateTripFulfilled = (data, meta) => ({
  type: 'trip/update/fulfilled',
  payload: { data, meta }
})

const updateTripRejected = (error, meta) => ({
  type: 'trip/update/rejected',
  payload: { error, meta }
})

export const updateTrip = (id, data) => {
  const meta = { id }
  return (dispatch, getState) => {
    dispatch(updateTripPending(meta))
    return axios.put(`${API_BASE_URL}/trips/${id}`, data)
      .then(response => {
        const data = response.data.data
        const meta = { id: data.id }
        dispatch(updateTripFulfilled(data, meta))
        return data
      })
      .catch(error => {
        dispatch(updateTripRejected(error, meta))
        return false
      })
  }
}

export const linkTripMedias = (id, media_ids) => {
  const meta = { id }
  const data = { media_ids: media_ids.join(',') }
  return (dispatch, getState) => {
    dispatch(updateTripPending(meta))
    return axios.post(`${API_BASE_URL}/trips/${id}/media`, data)
      .then(response => {
        const data = response.data.data
        const meta = { id: data.id }
        dispatch(updateTripFulfilled(data, meta))
        return data
      })
      .catch(error => {
        dispatch(updateTripRejected(error, meta))
        return false
      })
  }
}

export const unlinkTripMedias = (id, trip_media_id) => {
  const meta = { id }
  return (dispatch, getState) => {
    dispatch(updateTripPending(meta))
    return axios.delete(`${API_BASE_URL}/trips/${id}/media/${trip_media_id}`)
      .then(response => {
        const data = response.data.data
        const meta = { id: data.id }
        dispatch(updateTripFulfilled(data, meta))
        return data
      })
      .catch(error => {
        dispatch(updateTripRejected(error, meta))
        return false
      })
  }
}

export const createTripPrice = (id, data) => {
  const meta = { id }
  return (dispatch, getState) => {
    dispatch(updateTripPending(meta))
    return axios.post(`${API_BASE_URL}/trips/${id}/price`, data)
      .then(response => {
        const data = response.data.data
        const meta = { id: data.id }
        dispatch(updateTripFulfilled(data, meta))
        return data
      })
      .catch(error => {
        dispatch(updateTripRejected(error, meta))
        return false
      })
  }
}

export const deleteTripPrice = (id, price_id) => {
  const meta = { id }
  return (dispatch, getState) => {
    dispatch(updateTripPending(meta))
    return axios.delete(`${API_BASE_URL}/trips/${id}/price/${price_id}`)
      .then(response => {
        const data = response.data.data
        const meta = { id: data.id }
        dispatch(updateTripFulfilled(data, meta))
        return data
      })
      .catch(error => {
        dispatch(updateTripRejected(error, meta))
        return false
      })
  }
}

export const createTripPlan = (id, data) => {
  const meta = { id }
  return (dispatch, getState) => {
    dispatch(updateTripPending(meta))
    return axios.post(`${API_BASE_URL}/trips/${id}/plans`, data)
      .then(response => {
        const data = response.data.data
        const meta = { id: data.id }
        dispatch(updateTripFulfilled(data, meta))
        return data
      })
      .catch(error => {
        dispatch(updateTripRejected(error, meta))
        return false
      })
  }
}

export const deleteTripPlan = (id, plan_id) => {
  const meta = { id }
  return (dispatch, getState) => {
    dispatch(updateTripPending(meta))
    return axios.delete(`${API_BASE_URL}/trips/${id}/plans/${plan_id}`)
      .then(response => {
        const data = response.data.data
        const meta = { id: data.id }
        dispatch(updateTripFulfilled(data, meta))
        return data
      })
      .catch(error => {
        dispatch(updateTripRejected(error, meta))
        return false
      })
  }
}
