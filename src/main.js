import Vuex from 'vuex'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
import NProgress from 'vue-nprogress'

import store from './store'

import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient, appOptions }) {
  Vue.component('Layout', DefaultLayout)

  Vue.use(BootstrapVue)
  Vue.use(NProgress)
  Vue.use(VueAxios, axios)
  Vue.use(Vuex)

    if (isClient){
        const nprogress = new NProgress()
        appOptions.nprogress = nprogress

        appOptions.store = store
        appOptions.store.subscribe((mutation, state) => {
            localStorage.setItem('store', JSON.stringify(state))
        })
        appOptions.beforeCreate = function(){
            this.$store.commit('initialiseStore')
        }
    }
}
