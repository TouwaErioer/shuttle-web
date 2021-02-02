const state = () => ({
    stores: []
})

const getters = {
    getStoresBySid: (state) => (sid) => {
        return state.stores.filter(store => store.sid == sid)
    },
    storesCache: (state) => (sid) => {
        for (let store of state.stores) {
            if (store.sid == sid) return true
        }
        return false
    },
    getStoreById: (state) => (id) => {
        return state.stores.filter(store => store.id == id)
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