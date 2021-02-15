const state = () => ({
    animation: localStorage.getItem('animation'),
    height: 50
})

const getters = {
    getAnimation: (state) => {
        return state.animation;
    },
    getHeight: (state) => {
        return state.height.toString() + 'px';
    }
};

const mutations = {
    setAnimation(state, animation) {
        this.animation = animation
    },
    setHeight(state, height) {
        state.height = height;
    }
};

export default {
    state,
    getters,
    mutations
}