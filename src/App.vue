<template>
    <transition name="slide-fade">
        <keep-alive include="home_layout">
            <router-view></router-view>
        </keep-alive>
    </transition>
</template>

<script>

    export default {
        name: "App",
        created() {
            window.addEventListener('beforeunload', e => this.update(e))
        },
        methods: {
            // 刷新或关闭调用
            update() {
                let cartMap = this.$store.getters.getCartMap
                if (cartMap.size == 0) localStorage.removeItem('cart')
                else localStorage.setItem('cart', JSON.stringify(Array.from(cartMap)))
            }
        },
        destroyed() {
            window.removeEventListener('beforeunload', e => this.update(e))
        }
    };
</script>

<style scoped>
    @import 'style/cover.css';
    @import 'style/animation.css';
    @import url('https://unpkg.com/element-ui/lib/theme-chalk/index.css');
</style>
