const state = () => ({
    categories: []
})

const getters = {
    getCategories: (state) => (id) => {
        return state.categories.filter(category => category.id == id)
    },
    categoriesCache: (state) => (id) => {
        for (let category of state.categories) {
            if (category.id == id) return true
        }
        return false
    }
}

const mutations = {
    setCategories(state, categories) {
        state.categories.push(categories)
    }
}

export default {
    state,
    getters,
    mutations
}