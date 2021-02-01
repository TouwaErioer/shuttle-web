const state = () => ({
    stores: []
})

const getters = {
    getStores: (state) => (id) => {
        return state.stores.filter(store => store.sid == id)
    },
    cache: (state) => (id) => {
        for (let store of state.stores) {
            if (store.sid == id) return true
        }
        return false
    }
}

const mutations = {
    setStores(state, stores) {
        state.stores.push(...stores)
    }
}

export default {
    state,
    getters,
    mutations
}