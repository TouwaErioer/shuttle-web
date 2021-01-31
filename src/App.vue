<template>
    <transition name="el-fade-in-linear">
        <router-view/>
    </transition>
</template>

<script>

    export default {
        name: 'App',
    }
</script>

<style scoped>
    /*覆盖全局样式*/
    @import 'style/cover.css';
</style>
