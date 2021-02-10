<template>
    <Page>
        <template v-slot:headers>
            <Headers>
                <span><i class="el-icon-tickets"></i> 订单</span>
            </Headers>
        </template>
        <template v-slot:center>
            <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit">
                <el-tabs v-model="activeName" type="card" :stretch="true" v-if="tableData != null">
                    <el-tab-pane label="已下单" name="first">
                        <span slot="label"><i class="el-icon-sold-out"></i> 已下单</span>
                        <Tables :table-data="getTableData('已下单')" :type="'已下单'"/>
                    </el-tab-pane>
                    <el-tab-pane label="配送中" name="second">
                        <span slot="label"><i class="el-icon-shopping-cart-full"></i> 配送中</span>
                        <Tables :table-data="getTableData('配送中')" :type="'配送中'"/>
                    </el-tab-pane>
                    <el-tab-pane label="已完成" name="third">
                        <span slot="label"><i class="el-icon-circle-check"></i> 已完成</span>
                        <Tables :table-data="getTableData('已完成')" :type="'已完成'"/>
                    </el-tab-pane>
                </el-tabs>
            </mescroll-vue>
        </template>
    </Page>
</template>

<script>

    import Page from "@/layout/page";
    import Headers from "@/components/headers";
    import mock from "@/mock";
    import Tables from "@/components/tables";
    import MescrollVue from 'mescroll.js/mescroll.vue'
    import {findByUserId} from "@/utils/api/order";
    import common from "@/utils/commont";

    export default {
        name: "order",
        components: {Tables, Headers, Page, MescrollVue},
        data() {
            return {
                tableData: null,
                activeName: 'first',
                mescrollDown:{
                    callback: this.downCallBack,
                    auto: false
                }
            }
        },
        computed:{
            getTableData() {
                return (type) => {
                    if (type === '已下单') {
                        return this.tableData.filter(order => order.status === -1)
                    } else if (type === '配送中') {
                        return this.tableData.filter(order => order.status === 0)
                    } else if (type === '已完成') {
                        return this.tableData.filter(order => order.status === 1)
                    }
                }
            }
        },
        created(){
            this.getOrder()
        },
        methods: {
            getOrder(){
                let userInfo = common.getUserInfo();
                findByUserId(userInfo.id).then(res => {
                    if(res.code === 1){
                        this.tableData = res.data.list;
                    }
                })
            },
            mescrollInit (mescroll) {
                this.mescroll = mescroll
            },
            downCallBack(mescroll){
                let order = mock.order()
                this.tableData = order
                this.$nextTick(() => {
                    mescroll.endSuccess(order.length)
                })
            }
        }
    }
</script>

<style scoped>
</style>