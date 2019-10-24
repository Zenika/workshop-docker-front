import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.config.productionTip = true
Vue.config.devtools = true

Vue.use(VueRouter)

new Vue({
  router: new VueRouter({
    mode: 'history',
    routes
  }),
  render: h => h(App)
}).$mount('#app')

/* // handle routing
function onHashChange () {
  var visibility = window.location.hash.replace(/#\/?/, '')
  if (filters[visibility]) {
    app.visibility = visibility
  } else {
    window.location.hash = ''
    app.visibility = 'all'
  }
} */
