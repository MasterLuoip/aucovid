import Vue from 'vue'
// import axios from 'axios'
// import mpAdapter from 'axios-miniprogram-adapter'

const state = {
  statesObj: {}
}

const getters = {}

const actions = {
  getStatesData (context) {
    Vue.axios
      .get('https://interactive.guim.co.uk/docsdata/1q5gdePANXci8enuiS4oHUJxcxC13d6bjMRSicakychE.json')
      .then((response) => {
        context.commit('genStateObj', response.data)
      })
  }
}

const mutations = {
  genStateObj (state, data) {
    state.statesObj =
      data.sheets['latest totals'].reduce((obj, state) => {
        obj[state['State or territory']] = state
        return obj
      }, {})
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
