import axios from 'axios'

export const setDefaultAxios = (): void => {
  axios.defaults.baseURL = ``
}

export default setDefaultAxios
