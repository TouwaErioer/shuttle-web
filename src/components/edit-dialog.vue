<template>
    <div>
        <i class="el-icon-edit-outline" @click="editing = true" />
        <el-dialog title="内容修改" :visible.sync="editing" width="300px">
            <el-input
                v-bind="$props"
                v-model="newValue"
                :minlength="minLength"
                :maxlength="maxLength"
            />
            <div class="error-msg" v-if="!pass" v-text="errorMsg" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="editing = false" v-text="'取 消'" />
                <el-button type="primary" @click="handle" v-text="'保 存'" />
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
        showWordLimit: Boolean,
        regex: String,
        errorMsg: String,
    },
    data() {
        return {
            editing: false,
            newValue: "",
            regExp: null,
            pass: true,
        };
    },
    methods: {
        handle() {
            if (!this.regExp.test(this.newValue)) {
                this.pass = false;
                return;
            }

            this.pass = true;
            this.editing = false;
            this.$emit("save", this.newValue);
        },
    },
    created: function () {
        this.newValue = this.$props.value;
        this.regExp = new RegExp(this.regex);
    },
};
</script>

<style lang="scss" scoped>
.error-msg {
    color: #f03618;
}
</style>