<template>
    <div class="center">
        <div class="user-info-area">
            <cell :access="true" :access-light="true">
                <template v-slot:header>
                    <el-avatar
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    />
                </template>
                <div class="info-list">
                    <cell icon="user" text="admin" />
                    <cell icon="phone" text="13000000000" />
                </div>
            </cell>
        </div>
        <div class="features">
            <cells>
                <cell icon="s-order" text="我的订单" :access="true" />
                <cell icon="present" text="积分商城" :access="true" />
                <cell icon="bank-card" text="会员卡" :access="true" />
            </cells>
            <cells>
                <cell icon="service" text="服务中心" :access="true" />
            </cells>
        </div>
    </div>
</template>

<script>
import cell from "@/components/cell.vue";
import cells from "@/components/cells.vue";

export default {
    name: "center",
    components: {
        cell,
        cells,
    },
};
</script>

<style lang="scss" scoped>
.center {
    background-color: #f8f8f8;
    height: 100%;
}

.user-info-area {
    background-color: #298eeb;
    color: #fefefe;
    padding-top: 50px;

    .info-list > .cell {
        padding: 4px 15px;
    }
}

.features {
    padding: 0 10px;
}
</style>