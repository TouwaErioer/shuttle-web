<template>
    <div>
        <div class="service" style="background: #6395edc9">
            <span>
                <i class="el-icon-tickets"></i> 订单
            </span>
        </div>
        <div class="service" style="background: #ff7f50a8">
            <span>
                <i class="el-icon-sell"></i> 接单
            </span></div>
        <div class="service" style="background: pink">
            <span>
                <i class="el-icon-plus"></i> 添加商品
            </span>
        </div>
        <div class="service" style="background: thistle">
            <span>
                <i class="el-icon-data-analysis"></i> 后台管理
            </span>
        </div>

        <div class="service" style="background: #67c23ac7" @click="$router.push('/cart')">
            <span>
                <i class="el-icon-shopping-cart-1"></i> 购物车
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "service"
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