<template>
    <div class="center">
        <Headers>

            <span><i class="el-icon-setting"></i> 设置</span>
        </Headers>
        <div class="features">
            <cells class="cells">
                <cell
                        icon="el-icon-magic-stick"
                        text="动画效果"
                        :access="true"
                        @click="dialogAnimationVisible = true"
                />
                <cell
                        icon="el-icon-set-up"
                        text="头部高度"
                        :access="true"
                        @click="dialogHeaderVisible = true"
                />
                <cell
                        icon="el-icon-refresh"
                        text="清空缓存"
                        :access="true"
                        @click="clear"
                >
                </cell>
            </cells>
        </div>
        <el-dialog title="设置头部高度" :visible.sync="dialogHeaderVisible" width="80%">
            <el-slider v-model="height" :show-tooltip="false" @change="saveHeight"></el-slider>
        </el-dialog>
        <el-dialog title="设置动画效果" :visible.sync="dialogAnimationVisible" width="80%">
            <div class="select">
                <el-select v-model="animation" placeholder="请选择" class="animation">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button @click="saveAnimation">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import cell from "@/components/cell.vue";
    import cells from "@/components/cells.vue";
    import Headers from "@/components/headers";

    export default {
        name: "setting",
        components: {
            cell,
            cells,
            Headers
        },
        data() {
            return {
                userInfo: {
                    name: null,
                    phone: null,
                    address: null,
                    score: null,
                },
                dialogHeaderVisible: false,
                height: this.getHeight(),
                dialogAnimationVisible: false,
                options: [
                    {
                        label: '淡入淡出',
                        value: 'slide-fade',
                    },
                ],
                animation: localStorage.getItem('animation')
            };
        },
        created() {
            this.getUserInfo()
        },
        methods: {
            getUserInfo() {
                this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
            },
            clear() {
                this.$confirm('清空浏览器缓存？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                }).catch(() => {
                });
            },
            saveAnimation() {
                localStorage.setItem('animation', this.animation)
            },
            saveHeight() {
                localStorage.setItem('height', this.height)
            },
            getHeight() {
                return parseInt(localStorage.getItem('height'));
            }
        }
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

    .select {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .animation {
        margin: 10px 0;
    }
</style>