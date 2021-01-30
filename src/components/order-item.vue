<template>
    <div>
        <div class="order" v-for="(order,index) in getOrder" :key="index"
             @click="handleCurrentChange(order)">
            <div class="item">
                <div class="row">{{order.product}}</div>
                <div class="row">{{order.shop}}</div>
                <div class="row">
                    <el-tag>{{order.service}}</el-tag>
                </div>
            </div>
        </div>
        <Empty description='暂无订单' v-if="getOrder == 0"/>
    </div>
</template>

<script>
    import Empty from "@/components/empty";

    export default {
        name: "order-item",
        components: {Empty},
        props: ['type', 'name'],
        computed: {
            getOrder() {
                if(this.type == 'receive') return this.$store.getters.getOrders(this.name)
                else if(this.type == 'received') return this.$store.getters.getReceive
                else return this.$store.getters.getCompleted
            }
        },
        methods: {
            handleCurrentChange(order) {
                let html =
                    "<div><i class='el-icon-user'></i><span> 用户： test</span></div>" +
                    "<div><i class='el-icon-school'></i><span> 地址： test</span></div>" +
                    "<div><i class='el-icon-collection-tag'></i><span> 商品：" + order.product + "</span></div>" +
                    "<div><i class='el-icon-folder'></i><span> 服务：" + order.service + "</span></div>" +
                    "<div><i class='el-icon-goods'></i><span> 商店：" + order.shop + "</span></div>"
                let confirm = ''
                if (this.type == 'receive') {
                    confirm = '接单'
                } else if (this.type == 'completed') {
                    confirm = '删除'
                }
                this.$confirm(html, '详情', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: confirm,
                    cancelButtonText: '取消',
                }).then(() => {
                    if (this.type == 'receive') {
                        this.$store.commit('receive', order)
                        this.$message({
                            type: 'success',
                            message: '接单成功',
                            duration: 500
                        });
                    } else if (this.type == 'completed') {
                        this.$store.commit('removeReceive', order)
                        this.$message({
                            type: 'success',
                            message: '删除成功',
                            duration: 500
                        });
                    }
                }).catch(() => {

                });
            }
        }
    }
</script>

<style scoped>
    .order {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #dcdcdc;
    }

    .item {
        margin: 15px 25px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        color: #606266;
        font-size: 13px;
        align-items: center;
    }

    .row {
        width: 33%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>