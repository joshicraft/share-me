import Vue from 'vue'
import VueX from 'vuex'
import VuexPersist from 'vuex-persist'

import results from './modules/results'

Vue.use(VueX)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

export default new VueX.Store(
  {
    plugins: [vuexLocalStorage.plugin],
    modules: {
      results
    },
    state: {
      services: [],
      current: false
    },
    getters: {
      currentService: state => {
        return state.current
      },
      getService: state => (id) => {
        return state.services.find(service => {
          return service.id === id
        })
      }
    },
    actions: {},
    mutations: {}
  }
)
