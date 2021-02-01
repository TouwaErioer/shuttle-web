<template>
    <transition name="el-fade-in-linear">
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
@import "style/cover.css";
</style>
