import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import store from "@/page/explore/store"
import skeleton from "@/layout/skeleton"

const routes = [
    {
        path: '',
        component: skeleton
    },
    {
        path: '/service/:id',
        component: store,
        props: true
    }
]
export default new VueRouter({
    routes
})