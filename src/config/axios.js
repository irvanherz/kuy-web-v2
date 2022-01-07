import { default as axiosDefault }from 'axios'
import { store } from '../redux/store'

const axios = axiosDefault.create();
axios.interceptors.request.use(config => {
  const token = store.getState().auth.token
  config.headers = {
    Authorization: token ? ("Bearer " + token) : undefined,
  }
  return config;
}, error => {
  Promise.reject(error)
});

export default axios