import common from "@/utils/commont";

const state = () => ({
    orders: [],
    receive: [],
    current: null
});

const getters = {
    getOrders: (state) => (name) => {
        if (name === '全部') {
            return state.orders;
        } else {
            return state.orders.filter(order => order.service === name);
        }
    },
    getReceive: state => {
        return state.receive.filter(order => order.status === 0);
    },
    getCompleted: state => {
        return state.receive.filter(order => order.status === 1);
    },
    getCurrent: state => {
        return state.current;
    }
};

const mutations = {
    updateOrders(state, order) {
        state.orders.push(order);
    },
    setOrders(state, orders) {
        state.orders.push(...orders);
    },
    receive(state, order) {
        state.orders = common.arrayRemove(state.orders, order);
        order.status = 0;
        state.receive.push(order);
    },
    setReceive(state, receive) {
        state.receive = receive;
    },
    setCurrent(state, order) {
        state.current = order;
    }
};

export default {
    state,
    getters,
    mutations
}