import Vue from 'vue'
import Vuex from 'vuex'
import stats from './module/stats'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    stats
  }
})
