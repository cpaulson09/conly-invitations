import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';
import Home from './components/Home.vue'
import AddressList from './components/AddressList.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/dandelion', component: AddressList },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
