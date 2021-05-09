const state = () => ({
    stars: new Map()
});

const getters = {
    getStar: (state) => (storeId) => {
        return state.stars.get(storeId);
    },
    starCache: (state) => (storeId) => {
        return state.stars.has(storeId);
    }
};

const mutations = {
    setStars(state, payload) {
        state.stars.set(payload.storeId, payload.star);
    }
};

export default {
    state,
    getters,
    mutations
}