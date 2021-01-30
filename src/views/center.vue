<template>
    <div class="center">
        <div class="user-info-area">
            <cell
                :access="true"
                :access-light="true"
                @click="$router.push('/center/edit')"
            >
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
                <cell
                    icon="user"
                    text="个人信息"
                    :access="true"
                    @click="$router.push('/center/edit')"
                />
                <cell
                    icon="setting"
                    text="设置"
                    :access="true"
                    @click="$router.push('/center/setting')"
                />
                <cell icon="bank-card" text="充值" :access="true">
                    <template v-slot:footer>
                        <div v-text="'￥ 0'" />
                    </template>
                </cell>
            </cells>
            <cells>
                <cell icon="service" text="服务中心" :access="true" />
                <cell icon="turn-off" text="退出登录" />
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