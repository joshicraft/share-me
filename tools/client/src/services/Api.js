import axios from 'axios'
import config from '../../../config/index'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:' + config.server.port + '/'
  })
}
