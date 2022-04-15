<template>
    <div class="container">
                <vue-card-stack :cards="cards" :stack-width="360" :card-width="280">
                    <template v-slot:card="{ card }">
                        <el-card :body-style="{ padding: '0px' }">
                            <div :style="'height:300px;display: flex;justify-content: center;align-items: center;' +
                                'background-color: ' + card.background">
                                <i :class="card.icon" style="font-size: 30px;color: white"/>
                            </div>
                            <div style="padding: 15px;">
                                <span v-text="card.label"/>
                                <div class="bottom clearfix">
                                    <el-button type="text" class="button"
                                               @click="card.router === 'admin' ? openAdminWeb() :$router.push(card.router)">
                                        进入页面
                                    </el-button>
                                </div>
                            </div>
                        </el-card>
                    </template>
                </vue-card-stack>
    </div>
</template>

<script>
    import VueCardStack from "vue-card-stack";

    export default {
        name: "service",
        components: {VueCardStack},
        data() {
            return {
                cards: [
                    {background: "rgb(99, 149, 237)", label: '订单', icon: 'el-icon-tickets', router: '/order'},
                    {background: "#eb8081", label: '接单', icon: 'el-icon-sell', router: '/receive'},
                    {background: "pink", label: '购物车', icon: 'el-icon-shopping-cart-1', router: '/cart'},
                    {background: "#ffb26b", label: '收藏', icon: 'el-icon-star-off', router: '/star'}
                ],
                headerOpt: { isVisible: false },
                footerOpt: { isVisible: false }
            }
        },
        created() {
            let admin = this.$store.getters.getUserInfo.admin;
            if (admin) {
                this.cards.push({
                    label: '后台管理',
                    background: 'thistle',
                    icon: 'el-icon-data-analysis',
                    router: 'admin'
                })
            }
        },
        methods: {
            openAdminWeb() {
                window.open(process.env.VUE_APP_ADMIN + '/login/' + localStorage.getItem('token'));
            }
        }
    }
</script>

<style scoped>
    .container {
        background-color: #ebeef5
    }

    .container::-webkit-scrollbar {
        width: 0 !important
    }

    .card {
        width: 50px;
        height: 30px;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        flex-flow: column;
        border-radius: 15px;
    }

    .vcc {
        height: 50vh;
        width: 60vw;
    }
</style>
