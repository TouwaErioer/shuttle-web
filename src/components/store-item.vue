<template>
    <div class="list-item">
        <el-image class="item-image" :src="item.image" fit="cover"/>
        <div type="flex" class="goods-info">
            <div class="item-info">
                <el-tag size="mini" v-text="item.shop" effect="dark" class="item-tag" type="warning"></el-tag>
                <span v-text="item.name" class="item-name"></span>
            </div>
            <div class="item-desc">
                <el-rate v-model="item.rate" disabled text-color="#ff9900" show-score>
                </el-rate>
            </div>
            <div class="item-tag">
                <span v-text="'销量：' + item.sales"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "store-item",
        props: ['item']
    }
</script>

<style scoped lang="scss">
    .list-item {
        display: flex;
        background-color: #ffffff;
        border-bottom: 1px solid #dddddd;
        font-size: smaller;
        padding-bottom: 10px;

        & > * {
            margin: 5px;
        }

        .goods-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;

            .item-desc {
                margin: 3px;
                font-size: 20px;
            }

            .create {
                align-self: flex-end;
            }
        }
    }

    .el-tag--mini {
        height: 18px;
        line-height: 17px;
    }

    .el-tag {
        font-size: 5px;
    }

    .item-image {
        width: 100px;
        height: 100px;
        margin-top: 10px
    }

    .item-info {
        margin-top: 8px;
    }

    .item-name {
        margin: 3px;
        font-size: 18px
    }

    .item-tag {
        margin: 3px;
    }

    .item-button {
        float: right;
    }
</style>