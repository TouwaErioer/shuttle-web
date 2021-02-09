const state = () => ({
    animation: localStorage.getItem('animation')
})

const getters = {
    getAnimation: (state) => {
        return state.animation
    }
}

const mutations = {
    setAnimation(state, animation) {
        this.animation = animation
    }
}

export default {
    state,
    getters,
    mutations
}