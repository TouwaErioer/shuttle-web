<template>
    <page class="page">
        <template #headers>
            <headers>
                <cell><span>个人信息</span></cell>
            </headers>
        </template>
        <template #center>
            <cells :tidy-header="true">
                <cell icon="el-icon-user" title="头像">
                    <template v-slot:footer>
                        <el-avatar :src="avatarUrl" />
                    </template>
                </cell>
            </cells>
            <cells :tidy-header="true">
                <cell icon="el-icon-user" title="昵称">
                    <div v-text="userInfo.name" />
                    <template v-slot:footer>
                        <edit-dialog :value="userInfo.name" @save="setName" />
                    </template>
                </cell>
                <cell icon="el-icon-mobile-phone" title="电话">
                    <div v-text="userInfo.phone" />
                    <template v-slot:footer>
                        <edit-dialog
                            :value="userInfo.phone"
                            :min-length="11"
                            :max-length="11"
                            show-word-limit
                            @save="setPhone"
                            regex="^1[3-9][0-9]{9}$"
                            errorMsg="长度11位"
                        />
                    </template>
                </cell>
                <cell icon="el-icon-location-information" title="收货地址">
                    <div v-text="userInfo.local" />
                    <template v-slot:footer>
                        <edit-dialog
                            type="textarea"
                            :value="userInfo.local"
                            @save="setLocal"
                        />
                    </template>
                </cell>
            </cells>
            <cells>
                <cell icon="el-icon-lock" title="修改密码" :access="true" />
            </cells>
        </template>
    </page>
</template>

<script>
import Cell from "@/components/cell.vue";
import cells from "@/components/cells.vue";
import EditDialog from "@/components/edit-dialog.vue";
import Page from "@/layout/page.vue";
import Headers from "@/components/headers.vue";

export default {
    components: { cells, Cell, EditDialog, Page, Headers },
    name: "edit",
    data() {
        return {
            userInfo: {
                name: "hahaha",
                phone: "1234567890",
                local: "5-001",
            },
        };
    },
    methods: {
        setName: function (res) {
            this.userInfo.name = res;
            console.log(res);
        },
        setPhone: function (res) {
            this.userInfo.phone = res;
            console.log(res);
        },
        setLocal: function (res) {
            this.userInfo.local = res;
            console.log(res);
        },
    },
    computed: {
        avatarUrl: function () {
            return `https://api.multiavatar.com/${this.userInfo.name}.png`;
        },
    },
};
</script>

<style scoped>
.page {
    background-color: #f8f8f8;
}
</style>