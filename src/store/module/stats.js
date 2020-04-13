import Vue from 'vue'
// import axios from 'axios'
// import mpAdapter from 'axios-miniprogram-adapter'

const state = {
  statesObj: {},
  prevStates: {}
}

const getters = {}

const actions = {
  getStatesData (context) {
    Vue.axios
      .get('https://interactive.guim.co.uk/docsdata/1q5gdePANXci8enuiS4oHUJxcxC13d6bjMRSicakychE.json')
      .then((response) => {
        context.commit('genStateObj', response.data)
        context.commit('genPrevStatesData', response.data)
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
  },
  genPrevStatesData (state, data) {
    // sort updates data in reversed order
    let prevStates = data.sheets.updates.reduce((obj, event) => {
      if (!obj.hasOwnProperty(event['State'])) {
        obj[event['State']] = []
      }
      obj[event['State']].push(event)
      return obj
    }, {})
    for (const state in prevStates) {
      prevStates[state].sort((a, b) => {
        const adate = a.Date.split('/')
        let atime = []
        if (a.Time.length === 0) {
          atime = [0, 0]
        } else {
          atime = a.Time.split(':')
        }
        const bdate = b.Date.split('/')
        let btime = []
        if (b.Time.length === 0) {
          btime = [0, 0]
        } else {
          btime = b.Time.split(':')
        }
        const date1 = new Date(adate[2], adate[1], adate[0], atime[0], atime[1])
        const date2 = new Date(bdate[2], bdate[1], bdate[0], btime[0], btime[1])
        return date2.getTime() === date1.getTime() ? 0 : (date2.getTime() > date1.getTime() ? 1 : -1)
      })
    }
    // get the second lastest data
    let secondLastest = {}
    for (const state in prevStates) {
      let totalContinueFlag = true
      let deathContinueFlag = true
      let recoveredContinueFlag = true
      for (const event of prevStates[state]) {
        if (!secondLastest.hasOwnProperty(state)) {
          secondLastest[state] = {
            total: '',
            deaths: '',
            recovered: ''
          }
        }
        if (event['Cumulative case count'].length !== 0 && totalContinueFlag) {
          if (secondLastest[state].total.length !== 0) {
            totalContinueFlag = false
          }
          secondLastest[state].total = event['Cumulative case count']
        }
        if (event['Cumulative deaths'].length !== 0 && deathContinueFlag) {
          if (secondLastest[state].deaths.length !== 0) {
            deathContinueFlag = false
          }
          secondLastest[state].deaths = event['Cumulative deaths']
        }
        if (event['Recovered (cumulative)'].length !== 0 && recoveredContinueFlag) {
          if (secondLastest[state].recovered.length !== 0) {
            recoveredContinueFlag = false
          }
          secondLastest[state].recovered = event['Recovered (cumulative)']
        }
        if (!totalContinueFlag && !deathContinueFlag && !recoveredContinueFlag) {
          break
        }
      }
    }
    let national = {
      total: '0',
      deaths: '0',
      recovered: '0'
    }
    for (const austate in state.prevStates) {
      for (const attr in state.prevStates[austate]) {
        national[attr] = String(Number(national[attr]) + Number(state.prevStates[austate][attr]))
      }
    }
    secondLastest['National'] = national
    state.prevStates = secondLastest
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
