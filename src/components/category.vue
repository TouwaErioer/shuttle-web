<template>
    <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit">
        <el-tabs v-model="activeName" type="card" :stretch="true" :tabPosition="position">
            <el-tab-pane :name="category.name" v-for="(category,index) in categories" :key="index"
                         :label="category.name">
                <order-item :type="'receive'" :name="category.name"/>
            </el-tab-pane>
        </el-tabs>
    </mescroll-vue>
</template>

<script>
    import MescrollVue from 'mescroll.js/mescroll.vue'
    import OrderItem from "@/components/order-item";
    import common from "@/utils/commont";

    export default {
        name: "category",
        components: {OrderItem, MescrollVue},
        props: ['categories', 'position'],
        data() {
            return {
                activeName: this.categories[0].name,
                mescrollDown: {
                    callback: this.downCallBack
                }
            }
        },
        methods: {
            mescrollInit(mescroll) {
                this.mescroll = mescroll
            },
            downCallBack(mescroll) {
                this.$nextTick(() => {
                    mescroll.endSuccess()
                })
            },
            detail(order) {
                let html =
                    "<div><i class='el-icon-user'></i><span> 用户： test</span></div>" +
                    "<div><i class='el-icon-school'></i><span> 地址： test</span></div>" +
                    "<div><i class='el-icon-collection-tag'></i><span> 商品：" + order.product + "</span></div>" +
                    "<div><i class='el-icon-folder'></i><span> 服务：" + order.service + "</span></div>" +
                    "<div><i class='el-icon-goods'></i><span> 商店：" + order.shop + "</span></div>"
                this.$confirm(html, '详情', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '接单',
                    cancelButtonText: '取消',
                }).then(() => {
                    this.orders = common.arrayRemove(this.orders, order)
                    this.$message({
                        type: 'success',
                        message: '接单成功',
                        duration: 500
                    });
                }).catch(() => {

                });
            }
        }
    }
</script>

<style scoped>

</style>