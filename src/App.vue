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
};
</script>

<style scoped>
    /*覆盖全局样式*/
    @import 'style/cover.css';
    @import 'style/animation.css';
</style>
