import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import service from "@/page/explore/stores"
import skeleton from "@/layout/skeleton"
import store from "@/page/explore/store"
import cart from '@/page/explore/cart'
import product from '@/page/explore/product'

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
                    center: () => import('@/views/center.vue'),
                },
            }
        ]
    },
    {
        path: '/service/:id',
        component: service,
        props: true
    },
    {
        path: '/store/:id',
        component: store,
        props: true
    },
    {
        path: '/cart',
        component: cart
    },
    {
        path: '/product/:pid',
        component: product,
        props: true
    },
    {
        path: '/center/edit',
        component: () => import('@/page/center/edit.vue'),
    },
    {
        path: '/center/setting',
        component: () => import('@/page/center/setting.vue'),
    }
]
export default new VueRouter({
    routes
})