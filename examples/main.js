import Vue from 'vue'
import App from './App.vue'
import HjVueUi from '../packages'

Vue.config.productionTip = false
Vue.use(HjVueUi)
new Vue({
  render: h => h(App)
}).$mount('#app')
