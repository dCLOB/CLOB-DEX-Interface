import axios from 'axios'
import Routes from 'constants/routes'
import history from 'helpers/history'

const httpService = {
  setupInterceptors: () => {
    axios.interceptors.request.use(
      (config: any) => {
        config.headers['Content-Type'] = 'application/json'
        return config
      },
      (error) => error
    )
    axios.interceptors.response.use(
      (response) => {
        // simply return the response if there is no error

        return response
      },
      (error) => {
        if (error.response.status === 403) {
          history.push(Routes.ROUTE_HOME)
          return Promise.reject(error)
        }
        return Promise.reject(error)
      }
    )
  },
}
export default httpService
