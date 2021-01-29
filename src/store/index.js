import Vue from 'vue'

import Vuex from 'vuex'

import cart from '@/store/modules/cart'
import service from '@/store/modules/sevice'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        cart,
        service
    },
})