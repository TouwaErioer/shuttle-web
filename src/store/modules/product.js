const state = () => ({
    products: []
})

const getters = {
    getProducts: (state) => (sid) => {
        return state.products.filter(product => product.sid == sid)
    },
    productsCache: (state) => (sid) => {
        for (let product of state.products) {
            if (product.sid == sid) return true
        }
        return false
    }
}

const mutations = {
    setProducts(state, products) {
        state.products.push(...products)
    }
}

export default {
    state,
    getters,
    mutations
}