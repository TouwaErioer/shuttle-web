import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import service from "@/page/explore/stores"
import skeleton from "@/layout/skeleton"

const routes = [
    {
        path: '',
        component: skeleton
    },
    {
        path: '/service/:id',
        component: service,
        props: true
    }
]
export default new VueRouter({
    routes
})