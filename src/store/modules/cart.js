const state = () => ({
    cartMap: new Map(),
    count: 0
})

const getters = {
    getCartMap: state => {
        return state.cartMap
    },
    getCount: state => {
        return state.count
    }
}

const mutations = {
    addCart(state, product) {
        state.count++
        let cartMap = state.cartMap
        let id = product.id
        let data = product.data
        if (cartMap.has(id)) {
            let product = cartMap.get(id)
            product.count = product.count + 1
            cartMap.set(id, product)
        } else {
            cartMap.set(id, data)
        }
        state.cartMap = cartMap
    },
    changeCart(state, payload) {
        state.count += payload.currentValue - payload.oldValue
    },
    clear(state) {
        state.count = 0
        state.cartMap.clear()
    }
}

export default {
    state,
    getters,
    mutations
}