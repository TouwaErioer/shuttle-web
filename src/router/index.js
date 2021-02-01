import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import service from "@/page/explore/stores"
import store from "@/page/explore/store"
import cart from '@/page/explore/cart'
import order from '@/page/service/order'
import receive from '@/page/service/receive'
import HomeLayout from '@/layout/HomeLayout.vue'
import entrance from '@/page/login'

const routes = [
    {
        path: '',
        component: entrance
    },
    {
        path: '/home',
        component: HomeLayout
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
        path: '/order',
        component: order
    },
    {
        path: '/receive',
        component: receive
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