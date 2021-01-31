<template>
    <el-table
            :data="orders"
            style="width: 100%"
            :stretch="true"
            @row-click="handleCurrentChange">
        <el-table-column
                prop="product"
                label="商品"
                align="center">
            <template slot-scope="scope">
                <span @click="detail(scope.row)">{{scope.row.product}}</span>
            </template>
        </el-table-column>
        <el-table-column
                prop="date"
                label="时间"
                align="center">
        </el-table-column>
        <el-table-column
                prop="status"
                label="状态"
                align="center">
            <template slot-scope="scope">
                <el-tag :type="getStatusType(scope.row.status)">
                    <i :class="getStatusIcon(scope.row.status)"></i>
                    {{getStatus(scope.row.status)}}
                </el-tag>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import common from "@/utils/commont";

    export default {
        name: "tables",
        props: ['tableData', 'type'],
        data(){
            return{
                orders: this.tableData
            }
        },
        methods: {
            getStatus(status) {
                if (status == -1) {
                    return '待接单'
                } else if (status == 0) {
                    return '配送中'
                } else if (status == 1) {
                    return '已完成'
                }
            },
            getStatusIcon(status) {
                if (status == -1) {
                    return 'el-icon-loading'
                } else if (status == 0) {
                    return 'el-icon-shopping-cart-full'
                } else if (status == 1) {
                    return 'el-icon-circle-check'
                }
            },
            getStatusType(status) {
                if (status == -1) {
                    return 'primary'
                } else if (status == 0) {
                    return 'warning'
                } else if (status == 1) {
                    return 'success'
                }
            },
            action(order) {
                this.orders = common.arrayRemove(this.orders, order)
            },
            handleCurrentChange(row) {

                let confirmButton = '确定'
                if (this.type != '配送中'){
                    confirmButton = '删除'
                }
                let html =
                    "<div><i class='el-icon-user'></i><span> 用户： test</span></div>" +
                    "<div><i class='el-icon-school'></i><span> 地址： test</span></div>" +
                    "<div><i class='el-icon-collection-tag'></i><span> 商品：" + row.product + "</span></div>" +
                    "<div><i class='el-icon-folder'></i><span> 服务：" + row.service + "</span></div>" +
                    "<div><i class='el-icon-goods'></i><span> 商店：" + row.shop + "</span></div>" +
                    "<div><i class='el-icon-time'></i><span> 时间：" + row.date + "</span></div>"
                this.$confirm(html, '详情', {
                    confirmButtonText: confirmButton,
                    cancelButtonText: '返回',
                    dangerouslyUseHTMLString: true,
                }).then(() =>{
                    if (this.type != '配送中'){
                        this.action(row)
                    }
                }).catch(() => {

                });
            }
        }
    }
</script>

<style scoped>
</style>