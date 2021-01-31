<template>
    <Page>
        <template v-slot:headers>
            <Headers>
                <span><i class="el-icon-sell"></i> 接单</span>
            </Headers>
        </template>
        <template v-slot:center>
            <el-tabs v-model="activeName" type="card" :stretch="true" tabPosition="bottom">
                <el-tab-pane name="first" style="height: 100%">
                    <span slot="label"><i class="el-icon-tickets"></i> 订单</span>
                    <Category :categories="getCategory()" :position="'top'"/>
                </el-tab-pane>
                <el-tab-pane name="second">
                    <span slot="label"><i class="el-icon-sell"></i> 已接单</span>
                    <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit">
                        <order-item :type="'received'"/>
                    </mescroll-vue>
                </el-tab-pane>
                <el-tab-pane name="third">
                    <span slot="label"><i class="el-icon-circle-check"></i> 已完成</span>
                    <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit">
                        <order-item :type="'completed'"/>
                    </mescroll-vue>
                </el-tab-pane>
            </el-tabs>
        </template>
    </Page>
</template>

<script>
    import Page from "@/layout/page";
    import Headers from "@/components/headers";
    import Category from "@/components/category";
    import mock from "@/mock";
    import MescrollVue from 'mescroll.js/mescroll.vue'
    import OrderItem from "@/components/order-item";

    export default {
        name: "receive",
        components: {OrderItem, Category, Headers, Page, MescrollVue},
        data() {
            return {
                activeName: 'first',
                mescrollDown: {
                    callback: this.downCallBack
                }
            }
        },
        created() {
            this.$store.commit('setReceive', mock.received())
            this.$store.commit('setOrders', mock.order())
        },
        methods: {
            getCategory() {
                let services = [{'id': 0, 'name': '全部'}]
                services.push(...mock.services())
                return services
            },
            mescrollInit(mescroll) {
                this.mescroll = mescroll
            },
            downCallBack(mescroll) {
                this.$nextTick(() => {
                    mescroll.endSuccess()
                })
            }
        }
    }
</script>

<style scoped>
</style>