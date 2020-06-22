import Api from 'Api'

export default {
  add () {
    return Api().post('/seeder')
  },
  remove () {
    return Api().delete('/seeder')
  }

}
