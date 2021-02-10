const state = () => ({
    userInfo: JSON.parse(localStorage.getItem('userInfo'))
});

const getters = {
    getUserInfo: (state) => {return state.userInfo;}
};

export default {
    state,
    getters,
}