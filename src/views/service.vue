<template>
    <div class="container">
        <vue-card-stack :cards="cards" :stack-width="360" :card-width="280">
            <template v-slot:card="{ card }">
                <div class="card" @click="card.router === 'admin' ? openAdminWeb() :$router.push(card.router)"
                     style="width: 100%; height: 100%;"
                     :style="{ background: card.background }"
                >
                    <div :class="card.icon" style="margin: 10px;font-size: 30px"/>
                    <div v-text="card.label" :icon="card.icon"/>
                </div>
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
                    {background: "#ffb26b", label: '收藏', icon: 'el-icon-star-off', router: '/star'},
                    {background: "#95e1d3", label: '审批', icon: 'el-icon-shopping-cart-1', router: '/approve'},
                ]
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
</style>
