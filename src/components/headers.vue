<template>
    <header class="simple-header" :style="'line-height:' + $store.getters.getHeight">
        <span class="el-icon-arrow-left icon" @click="back()"></span>
        <div class="simple-header-name">
            <slot/>
        </div>
        <slot name="icon">
            <span slot="icon" @click="$router.replace('/home')"><i class="el-icon-house"></i></span>
        </slot>
    </header>
</template>

<script>
    export default {
        name: "headers",
        methods: {
            back() {
                this.$router.back()
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/style/header.scss";
</style>