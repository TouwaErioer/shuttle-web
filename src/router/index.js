import Vue from 'vue'
import VueRouter from 'vue-router'
import common from "@/utils/commont";

import {Message} from 'element-ui'

Vue.use(VueRouter);


const house = localStorage.getItem('house');

const routes = [
    {
        path: '/',
        redirect: '/' + (house === null ? 'home' : house)
    },
    {
        path: '/login',
        component: () => import('@/page/login')
    },
    {
        path: '/home',
        component: () => import('@/layout/HomeLayout')
    },
    {
        path: '/service/:sid',
        component: () => import('@/page/explore/stores'),
        props: true
    },
    {
        path: '/store/:sid',
        component: () => import('@/page/explore/store'),
        props: true
    },
    {
        path: '/cart',
        component: () => import('@/page/explore/cart')
    },
    {
        path: '/order',
        component: () => import('@/page/service/order')
    },
    {
        path: '/receive',
        component: () => import('@/page/service/receive')
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
    },
    {
        path: '/detail',
        component: () => import('@/page/service/detail')
    },
    {
        path: '/star',
        component: () => import('@/page/service/star')
    },
    {
        path: '/approve',
        component: () => import('@/page/service/approve')
    },
    {
        path: '/chat',
        component: () => import('@/page/center/chat')
    }
];

const routers = new VueRouter({
    mode: 'history',
    routes
});

routers.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    let path = to.path;
    let userInfo = common.getUserInfo();
    if (!token) {
        if (path !== '/login') next({path: '/login'});
        else next();
    } else if (path === '/order' || path === '/receive' || path === '/cart') {
        if (!(userInfo.email !== 'null' || userInfo.address !== null || userInfo.name !== null)) {
            Message.error('请完善基本信息');
            next('/center/edit');
        } else next();
    } else next();
});

export default routers
