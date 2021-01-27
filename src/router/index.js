import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import store from "@/page/explore/store"
import skeleton from "@/layout/skeleton"

const routes = [
    {
        path: '/',
        component: skeleton,
        children: [
            {
                path: '/',
                components: {
                    explore: () => import('@/views/explore.vue'),
                    service: () => import('@/views/service.vue'),
                    search: () => import('@/views/search.vue'),
                },
                // component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
            }
        ]
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