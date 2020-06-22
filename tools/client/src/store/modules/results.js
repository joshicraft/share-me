import Api from '../../services/Api'

export default {

  state: {
    items: [],
    selected: false
  },

  getters: {
    getByID: (state) => (id) => {
      return state.items.find(result => result._id === id)
    },
    getAll: (state) => {
      return state.items
    }
  },

  mutations: {
    apply (state, data) {
      state.items = data.results
    },
    update (state, item) {

    },
    selected (state, data) {
      state.selected = data
    }
  },

  actions: {
    fetch ({ commit }, params) {
      return Api().get('results')
        .then((res) => {
          commit('apply', res.data)
          params.res = res
          if (params.done) params.done(params)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    scrape ({ commit }, params) {
      return Api().get('results/scrape')
    },
    add ({ dispatch }, params) {
      return Api().post('results/add_result', params.item)
        .then((res) => {
          dispatch('fetch')
          params.res = res
          if (params.done) params.done(params)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    update ({ dispatch }, params) {
      return Api().put('results/' + params.item._id, params.new)
        .then((res) => {
          dispatch('fetch')
          params = params || {}
          params.res = res
          if (params.done) params.done(params)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    get ({ commit }, params) {
      console.log(params._id)
      if (!params._id) {
        this.fetch(params)
        return
      }
      return Api().get('results/' + params._id)
        .then((res) => {
          commit('apply', res.data)
          params.res = res
          if (params.done) params.done(params)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    remove ({ dispatch }, params) {
      console.log(params)
      return Api().delete('results/' + params.item._id)
        .then((res) => {
          dispatch('fetch', res.data)
          params.res = res
          if (params.done) params.done(params)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
