<template>
    <Page>
        <template v-slot:headers>
            <Headers>
                <span><i class="el-icon-sell"></i> 接单</span>
                <span slot="icon" @click="$router.replace('/home')"><i class="el-icon-house"></i></span>
            </Headers>
        </template>
        <template v-slot:center>
            <el-tabs v-model="activeName" type="card" :stretch="true" tabPosition="bottom"
                     style="position: fixed;bottom: 0;width: 100%;" class="receive">
                <el-tab-pane name="first" style="height: 100%">
                    <span slot="label"><i class="el-icon-tickets"></i> 订单</span>
                    <Category :categories="getCategory()" :position="'top'"/>
                </el-tab-pane>
                <el-tab-pane name="second">
                    <span slot="label"><i class="el-icon-sell"></i> 已接单</span>
                    <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit"
                                  :style="'top:'+ $store.getters.getHeight">
                        <order-item :type="'received'"/>
                    </mescroll-vue>
                </el-tab-pane>
                <el-tab-pane name="third">
                    <span slot="label"><i class="el-icon-circle-check"></i> 已完成</span>
                    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit"
                                  :style="'top:'+ $store.getters.getHeight">
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
    import MescrollVue from 'mescroll.js/mescroll.vue'
    import OrderItem from "@/components/order-item";
    import {findByReceive, findBySid} from "@/utils/api/order";

    export default {
        name: "receive",
        components: {OrderItem, Category, Headers, Page, MescrollVue},
        data() {
            return {
                activeName: 'first',
                mescrollDown: {
                    callback: this.downCallBack,
                    auto: false
                },
                userInfo: this.$store.getters.getUserInfo,
                mescrollUp: {
                    callback: this.upCallBack,
                    auto: false
                },
                pageNo: 1,
                ws: null
            }
        },
        created() {
            this.getOrder(this.pageNo);
            this.getReceived();
            const push = JSON.parse(localStorage.getItem('push'));
            if (("WebSocket" in window) && push === null ? true : push) {
                this.ws = new WebSocket(process.env.VUE_APP_WS);

                this.ws.onopen = function () {
                    console.log('已连接')
                };
                let self = this;
                this.ws.onmessage = function (evt) {
                    self.$store.commit('updateOrders', JSON.parse(evt.data));
                };

                this.ws.onclose = function () {
                    console.log('已关闭')
                };
            }
        },
        methods: {
            getOrder(pageNo) {
                findByReceive(pageNo).then(res => {
                    if (res.code === 1) {
                        this.$store.commit('setOrders', res.data.list)
                    }
                });
            },
            getReceived() {
                findBySid(this.userInfo.id, 1).then(res => {
                    if (res.code === 1) {
                        this.$store.commit('setReceive', res.data.list);
                    }
                })
            },
            getCategory() {
                let services = [{'id': 0, 'name': '全部'}];
                services.push(...this.$store.getters.getService);
                return services
            },
            mescrollInit(mescroll) {
                this.mescroll = mescroll
            },
            downCallBack() {
                this.getReceived();
                this.$nextTick(() => {
                    this.mescroll.endSuccess()
                });
            },
            upCallBack() {
                this.pageNo += 1;
                findBySid(this.userInfo.id, this.pageNo).then(res => {
                    if (res.code === 1) {
                        const data = res.data.list;
                        this.$store.commit('loadReceive', data);
                        this.$nextTick(() => {
                            this.mescroll.endSuccess(data.length);
                        })
                    }
                })
            }
        },
        destroyed() {
            this.$store.commit('clearOrders');
        }
    }
</script>

<style scoped>
</style>