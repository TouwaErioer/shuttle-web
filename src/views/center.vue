<template>
    <div class="center">
        <div class="user-info-area">
            <cell
                :access="true"
                :access-light="true"
                @click="$router.push('/center/edit')"
            >
                <template v-slot:header>
                    <el-avatar :src="avatarUrl" />
                </template>
                <div class="info-list">
                    <cell icon="el-icon-user" text="admin" />
                    <cell icon="el-icon-phone" text="13000000000" />
                </div>
            </cell>
        </div>
        <div class="features">
            <cells class="cells">
                <cell
                    icon="el-icon-user"
                    text="个人信息"
                    :access="true"
                    @click="$router.push('/center/edit')"
                />
                <cell
                    icon="el-icon-setting"
                    text="设置"
                    :access="true"
                    @click="$router.push('/center/setting')"
                />
                <cell icon="el-icon-bank-card" text="充值" :access="true">
                    <template v-slot:footer>
                        <div v-text="'￥ 0'" />
                    </template>
                </cell>
            </cells>
            <cells class="cells">
                <cell icon="el-icon-service" text="服务中心" :access="true" />
                <cell icon="el-icon-turn-off" text="退出登录" />
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
    data() {
        return {
            userInfo: {
                name: "hahaha",
                phone: "1234567890",
                local: "5-001",
            },
        };
    },
    computed: {
        avatarUrl: function () {
            return `https://api.multiavatar.com/${this.userInfo.name}.png`;
        },
    },
};
</script>

<style lang="scss" scoped>
.cells {
    border-radius: 8px;
}

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