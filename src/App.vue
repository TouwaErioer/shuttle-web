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
    @import 'style/cover.css';
</style>
