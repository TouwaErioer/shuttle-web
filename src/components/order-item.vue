<template>
    <div style="height: 100%">
        <el-table
                :data="getOrder"
                style="width: 100%;height: 100%;"
                :stretch="true"
                @row-click="handleCurrentChange">
            <el-table-column
                    prop="id"
                    label="单号"
                    align="center">
                <template slot-scope="scope">
                    <el-tag v-text="'No.' + scope.row.id"/>
                </template>
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status == 1?'success':'warning'">
                        <i :class="scope.row.status == 1?'el-icon-circle-check':'el-icon-loading'"></i>
                        {{getStatus}}
                    </el-tag>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

    export default {
        name: "order-item",
        props: ['type', 'name'],
        computed: {
            getOrder() {
                if(this.type == 'receive') return this.$store.getters.getOrders(this.name)
                else if(this.type == 'received') return this.$store.getters.getReceive
                else return this.$store.getters.getCompleted
            },
            getStatus(){
                if(this.type == 'receive') return '待接单'
                else if(this.type == 'received') return '待确认'
                else return '已完成'
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
</style>