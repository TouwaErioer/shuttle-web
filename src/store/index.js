import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        services: new Map()
    },
    mutations: {
        setServices(state, services) {
            services.forEach(service => state.services.set(service.id, service))
        }
    }
})