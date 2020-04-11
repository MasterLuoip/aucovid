import Vue from 'vue'
import App from './App'
import 'mpvue-weui/src/style/weui.css'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import mpAdapter from 'axios-miniprogram-adapter'

Vue.prototype.$store = store
Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(VueAxios, axios)
Vue.axios.defaults.adapter = mpAdapter

const app = new Vue(App)
app.$mount()
