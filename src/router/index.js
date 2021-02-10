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
import {check} from "@/utils/api/user";

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        component: entrance
    },
    {
        path: '/home',
        component: HomeLayout
    },
    {
        path: '/service/:sid',
        component: service,
        props: true
    },
    {
        path: '/store/:sid',
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
    },
    {
        path: '/center/balance',
        component: () => import('@/page/center/balance.vue'),
    },
    {
        path: '/result/:status',
        component: () => import('@/page/center/result'),
        props: true
    }
]

const routers = new VueRouter({
    mode: 'history',
    routes
})

routers.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (!token) {
        if (to.path !== '/login') next({path: '/login'});
        else next()
    } else {
        if (to.path === '/home') {
            check().then(res => {
                if (res === undefined) {
                    localStorage.removeItem('token');
                    next({path: '/login'})
                } else if (res.code === 1)
                    next();
            })
        }else next()
    }
});

export default routers