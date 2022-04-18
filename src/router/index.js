import Vue from 'vue'
import VueRouter from 'vue-router'
import common from "@/utils/commont";

import {Message} from 'element-ui'
import {findScore} from "@/utils/api/user";
import store from "@/store";

Vue.use(VueRouter);

const house = localStorage.getItem('house');

const routes = [
    {
        path: '/',
        redirect: '/' + (house === null ? 'home' : house)
    },
    {
        path: '/login',
        component: () => import('@/page/login'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/home',
        component: () => import('@/layout/HomeLayout'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/service/:sid',
        component: () => import('@/page/explore/stores'),
        props: true,
        meta: {
            title: '商店列表'
        }
    },
    {
        path: '/store/:sid',
        component: () => import('@/page/explore/store'),
        props: true,
        meta: {
            title: '商店详情'
        }
    },
    {
        path: '/cart',
        component: () => import('@/page/explore/cart'),
        meta: {
            title: '购物车'
        }
    },
    {
        path: '/order',
        component: () => import('@/page/service/order'),
        meta: {
            title: '订单'
        }
    },
    {
        path: '/receive',
        component: () => import('@/page/service/receive'),
        meta: {
            title: '接单'
        }
    },
    {
        path: '/center/edit',
        component: () => import('@/page/center/edit.vue'),
        meta: {
            title: '个人信息'
        }
    },
    {
        path: '/center/setting',
        component: () => import('@/page/center/setting.vue'),
        meta: {
            title: '设置'
        }
    },
    {
        path: '/center/balance',
        component: () => import('@/page/center/balance.vue'),
        meta: {
            title: '充值'
        }
    },
    {
        path: '/result/:status',
        component: () => import('@/page/center/result'),
        props: true,
        meta: {
            title: '充值结果'
        }
    },
    {
        path: '/detail',
        component: () => import('@/page/service/detail'),
        meta: {
            title: '订单详情'
        }
    },
    {
        path: '/star',
        component: () => import('@/page/service/star'),
        meta: {
            title: '收藏'
        }
    },
    {
        path: '/approve',
        component: () => import('@/page/service/approve'),
        meta: {
            title: '审批'
        }
    },
    {
        path: '/chat',
        component: () => import('@/page/center/chat'),
        meta: {
            title: '客服'
        }
    }
];

const routers = new VueRouter({
    mode: 'history',
    routes
});

routers.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    const token = localStorage.getItem('token');
    let path = to.path;
    let userInfo = common.getUserInfo();
    if (to.path === '/result/1') {
        findScore(userInfo.id).then(res => {
            store.commit('changeScore', res.data);
        });
    }
    if (!token) {
        if (path !== '/login') next({path: '/login'});
        else next();
    } else if (path === '/order' || path === '/receive' || path === '/cart') {
        if (userInfo.email === null || userInfo.address === null || userInfo.name === null) {
            Message.error('请完善基本信息');
            next('/center/edit');
        } else next();
    } else next();
});

export default routers
