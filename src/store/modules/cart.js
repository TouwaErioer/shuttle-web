import common from "@/utils/commont";

const state = () => ({
    products: [],
    count: 0
})

const getters = {
    getCount: state => {
        return state.count
    },
    getProducts: state => {
        return state.products
    }
}

const mutations = {
    addProductToCart(state, product) {
        state.count++
        let products = state.products
        let index = products.indexOf(product)
        if (index != -1) {
            products[index].count++
        } else {
            product.count = 1
            products.push(product)
        }
        state.products = products
    },
    changeCart(state, payload) {

        state.count --
        let index = state.products.findIndex(product => product.id == payload.pid)
        let product = state.products[index]
        if (product.count > 0) {
            state.products[index].count = payload.count
        } else {
            state.products = common.arrayRemove(state.products, product)
        }
    }
}

export default {
    state,
    getters,
    mutations
}