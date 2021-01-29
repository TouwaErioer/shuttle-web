const state = () => ({
    services: new Map()
})

const getters = {

}

const mutations = {
    setServices(state, services) {
        services.forEach(service => state.services.set(service.id, service))
    }
}

export default {
    state,
    getters,
    mutations
}