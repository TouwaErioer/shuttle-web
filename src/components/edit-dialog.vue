<template>
    <div>
        <i class="el-icon-edit-outline" @click="editing = true" />
        <el-dialog title="提示" :visible.sync="editing" width="80%">
            <el-input
                :type="type"
                :placeholder="placeholder"
                v-model="newValue"
                :minlength="minLength"
                :maxlength="maxLength"
                show-word-limit
            />
            <span slot="footer" class="dialog-footer">
                <el-button @click="editing = false" v-text="'取 消'" />
                <el-button
                    type="primary"
                    @click="
                        editing = false;
                        $emit('save', newValue);
                    "
                    v-text="'保 存'"
                />
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        type: String,
        value: String,
        placeholder: String,
        minLength: Number,
        maxLength: Number,
    },
    data() {
        return {
            editing: false,
            newValue: "",
        };
    },
    methods: {
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    console.log(_);
                    done();
                })
                .catch((_) => {
                    console.error(_);
                });
        },
    },
    created: function () {
        this.newValue = this.$props.value;
    },
};
</script>

<style lang="scss" scoped>
</style>