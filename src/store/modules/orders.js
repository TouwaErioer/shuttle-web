import common from "@/utils/commont";

const state = () => ({
    orders: [],
    receive: []
})

const getters = {
    getOrders: (state) => (name) => {
        if (name == '全部') {
            return state.orders
        } else {
            return state.orders.filter(order => order.service == name)
        }
    },
    getReceive: state => {
        return state.receive.filter(order => order.status == 0)
    },
    getCompleted: state => {
        return state.receive.filter(order => order.status == 1)
    }
}

const mutations = {
    updateOrders(state, order) {
        state.orders.push(order)
    },
    setOrders(state, orders) {
        state.orders.push(...orders)
    },
    receive(state, order) {
        state.orders = common.arrayRemove(state.orders, order)
        order.status = 0
        state.receive.push(order)
    },
    setReceive(state, receive) {
        state.receive = receive
    },
    removeReceive(state, receive) {
        state.receive = common.arrayRemove(state.receive, receive)
    },
}

export default {
    state,
    getters,
    mutations
}