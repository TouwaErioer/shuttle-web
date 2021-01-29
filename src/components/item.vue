<template>
    <div class="list-item" :style="color != null?'background-color:unset;border-bottom:unset':null"
         v-if="count == null?true:count != 0">
        <el-image class="item-image" :src="item.image" fit="cover" :preview-src-list="[item.image]"/>
        <div type="flex" class="goods-info">
            <div class="item-info">
                <span v-text="item.name" class="item-name"></span>
                <slot/>
            </div>
            <div class="item-desc">
                <el-rate v-model="item.rate" disabled text-color="#ff9900" show-score>
                </el-rate>
                <slot name="button"/>
            </div>
            <div class="item-tag" v-if="price == null">
                <span v-text="'总销量：' + item.sales"></span>
            </div>
            <div v-if="price != null">
                <span class="label"><i class="el-icon-collection-tag"></i> 单价：</span>
                <span class="price" v-text="'¥' + item.price"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "item",
        props: ['item', 'color', 'price', 'count']
    }
</script>

<style scoped lang="scss">
    .list-item {
        display: flex;
        background-color: #ffffff;
        border-bottom: 1px solid #dddddd;
        font-size: smaller;
        padding: 10px 0;

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
                display: flex;
                justify-content: space-between;
                align-items: center;
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

    .price {
        font-size: 3vh;
        color: #f56c6c;
    }

    .item-image {
        width: 100px;
        height: 100px;
        margin-top: 10px
    }

    .item-info {
        margin-top: 8px;
        display: flex;
        align-items: center;
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

    .label {
        margin-left: 3px;
    }
</style>