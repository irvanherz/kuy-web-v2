import axios from 'axios'
const TOMTOM_APIBASEURL = process.env.REACT_APP_TOMTOM_APIBASEURL
const TOMTOM_APIKEY = process.env.REACT_APP_TOMTOM_APIKEY

const tomtomSearchPoiPending = (meta) => ({
  type: 'tomtom/poi/search/pending',
  payload: { meta },
})

const tomtomSearchPoiFulfilled = (data, meta) => ({
  type: 'tomtom/poi/search/fulfilled',
  payload: { data, meta },
})

const tomtomSearchPoiRejected = (error, meta) => ({
  type: 'tomtom/poi/search/rejected',
  payload: { error, meta },
})

export const tomtomSearchPoi = (search, filters = {}, hash) => {
  const meta = { search, filters, hash }
  const encodedSearch = encodeURIComponent(search)
  return (dispatch, getState) => {
    dispatch(tomtomSearchPoiPending(meta))
    return axios.get(`${TOMTOM_APIBASEURL}/poiSearch/${encodedSearch}.json`, { params: { ...filters, key: TOMTOM_APIKEY } })
      .then(response => {
        const data = response.data
        const metaX = { ...meta, summary: data.summary }
        dispatch(tomtomSearchPoiFulfilled(data.results, metaX))
        return data
      }, error => {
        console.log(error);
        dispatch(tomtomSearchPoiRejected(error.response.data.error, meta))
        return false
      })
  }
}

const tomtomReverseGeocodePending = (meta) => ({
  type: 'tomtom/reverse-geocode/search/pending',
  payload: { meta },
})

const tomtomReverseGeocodeFulfilled = (data, meta) => ({
  type: 'tomtom/reverse-geocode/search/fulfilled',
  payload: { data, meta },
})

const tomtomReverseGeocodeRejected = (error, meta) => ({
  type: 'tomtom/reverse-geocode/search/rejected',
  payload: { error, meta },
})

export const tomtomReverseGeocode = (position, positionId) => {
  const meta = { id: positionId }
  const encodedPosition = encodeURIComponent(`${position.lat},${position.lng || position.lon}`)
  return (dispatch, getState) => {
    dispatch(tomtomReverseGeocodePending(meta))
    return axios.get(`${TOMTOM_APIBASEURL}/reverseGeocode/${encodedPosition}.json`, { params: { raiud: 100, key: TOMTOM_APIKEY } })
      .then(response => {
        const data = response.data
        const metaX = { ...meta, summary: data.summary }
        dispatch(tomtomReverseGeocodeFulfilled(data.addresses, metaX))
        return data
      }, error => {
        console.log(error);
        dispatch(tomtomReverseGeocodeRejected(error.response.data.error, meta))
        return false
      })
  }
}