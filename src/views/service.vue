<template>
    <div>
        <div class="service" style="background: #6395edc9" @click="$router.push('/order')">
            <span>
                <i class="el-icon-tickets"></i> 订单
            </span>
        </div>
        <div class="service" style="background: #ff7f50a8" @click="$router.push('/receive')">
            <span>
                <i class="el-icon-sell"></i> 接单
            </span>
        </div>
        <div class="service" style="background: pink" @click="$router.push('/cart')">
            <span>
                <i class="el-icon-shopping-cart-1"></i> 购物车
            </span>
        </div>
        <div class="service" style="background: thistle" v-if="admin" @click="openAdminWeb">
            <span>
                <i class="el-icon-data-analysis"></i> 后台管理
            </span>
        </div>
    </div>
</template>

<script>

    export default {
        name: "service",
        data() {
            return {
                adminTarget: null,
                admin: false
            }
        },
        created() {
            this.adminTarget = process.env.VUE_APP_ADMIN;
            this.admin = this.$store.getters.getUserInfo.admin;
        },
        methods: {
            openAdminWeb() {
                window.open(this.adminTarget);
            }
        }
    }
</script>

<style scoped>
    .service {
        margin: 10px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        border-radius: 10px;
    }
</style>