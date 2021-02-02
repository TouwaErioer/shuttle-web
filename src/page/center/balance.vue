<template>
    <page class="page">
        <template #headers>
            <headers>余额充值</headers>
        </template>

        <template #center>
            <cells>
                <cell title="余额">
                    <template #footer>
                        <div class="balance" v-text="'￥0'" />
                    </template>
                </cell>
            </cells>
            <el-row :gutter="20" class="opthin-area">
                <el-col :span="8" v-for="item in options" :key="'o-' + item">
                    <div class="item" v-text="item" />
                </el-col>
            </el-row>
            <cells>
                <cell title="其他数额">
                    <template #footer>
                        <el-input-number
                            v-model="num"
                            :min="1"
                            :max="100"
                            label="描述文字"
                            size="small"
                        ></el-input-number>
                    </template>
                </cell>
                <cell>
                    <el-button type="primary" class="btn" round>充值</el-button>
                </cell>
            </cells>
        </template>
    </page>
</template>

<script>
import Cell from "../../components/cell.vue";
import Cells from "../../components/cells.vue";
import Headers from "../../components/headers.vue";
import page from "../../layout/page.vue";
export default {
    components: { page, Headers, Cells, Cell },
    data() {
        return {
            options: [5, 10, 20, 30, 50, 100, 200],
            num: 0,
        };
    },
};
</script>

<style lang="scss" scoped>
.opthin-area {
    padding: 15px;
    margin: 0 !important;
}

.balance {
    font-size: 40px;
    font-weight: bolder;
}

.item {
    border-radius: 8px;
    height: 60px;
    border: 1px solid #1979db;
    margin: 8px;
    line-height: 60px;
    text-align: center;
    color: #1979db;
    font-weight: bolder;
}

.btn {
    width: 200px;
    margin: auto;
    display: block;
}
</style>
