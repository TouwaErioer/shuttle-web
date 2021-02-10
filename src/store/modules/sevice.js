const state = () => ({
    services: JSON.parse(sessionStorage.getItem('serviceList'))
});

const getters = {
    getService: (state) => {
        return state.services
    }
};

const mutations = {
};

export default {
    state,
    getters,
    mutations
}