<template>
    <div>
        <cells :tidy-header="true">
            <cell icon="user">
                <template v-slot:header>
                    <span v-text="'昵称'" class="title" />
                </template>
                <div v-text="userInfo.name" />
                <template v-slot:footer>
                    <edit-dialog :value="userInfo.name" @save="onSave" />
                </template>
            </cell>
            <cell icon="phone">
                <template v-slot:header>
                    <span v-text="'电话'" class="title" />
                </template>
                <div v-text="userInfo.phone" />
                <template v-slot:footer>
                    <edit-dialog
                        :value="userInfo.phone"
                        :min-length="11"
                        :max-length="11"
                    />
                </template>
            </cell>
        </cells>
    </div>
</template>

<script>
import Cell from "../../components/cell.vue";
import cells from "../../components/cells.vue";
import EditDialog from "../../components/edit-dialog.vue";
export default {
    components: { cells, Cell, EditDialog },
    name: "edit",
    data() {
        return {
            userInfo: {
                name: "hahaha",
                phone: "1234567890",
            },
        };
    },
    methods: {
        onSave: function (res) {
            this.userInfo.name = res;
            console.log(res);
        },
    },
};
</script>

<style scoped>
</style>