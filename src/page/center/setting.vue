<template>
    <div class="center">
        <Headers>

            <span><i class="el-icon-setting"></i> 设置</span>
            <span slot="icon" @click="$router.replace('/home')"><i class="el-icon-house"></i></span>
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
                <cell
                        icon="el-icon-sold-out"
                        text="定时推送"
                        :access="true"
                        @click="dialogPushVisible = true"
                >
                </cell>
                <cell
                        icon="el-icon-time"
                        text="保持登录"
                        :access="true"
                        @click="dialogExpiredVisible = true"
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
        <el-dialog title="设置推送开关" :visible.sync="dialogPushVisible" width="80%">
            <div>
                <p>开启此功能，会自动推送最新订单</p>
                <div class="switch">
                    <p>当前状态：</p>
                    <el-switch
                            v-model="push"
                            active-color="#13ce66"
                            inactive-color="#909399"
                            @change="changePush">
                    </el-switch>
                </div>
            </div>
        </el-dialog>
        <el-dialog title="设置登录过期时间" :visible.sync="dialogExpiredVisible" width="80%">
            <div class="select">
                <el-input placeholder="单位：分" v-model="expired" suffix-icon="el-icon-time" type="number"
                          class="expired"/>
                <el-button @click="setExpired">确定</el-button>
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
                animation: localStorage.getItem('animation'),
                dialogPushVisible: false,
                dialogExpiredVisible: false,
                push: true,
                expired: this.getExpired()
            };
        },
        created() {
            this.getUserInfo();
            const push = JSON.parse(localStorage.getItem('push'));
            this.push = push === null ? true : push;
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
                    this.$router.go(0);
                    sessionStorage.removeItem('serviceList');
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
            },
            setExpired() {
                if (this.expired === '') this.$message.error('登录过期时间不能为空');
                else {
                    localStorage.setItem('expired', this.expired);
                    this.$router.push('/login')
                }
            },
            getExpired() {
                const expired = localStorage.getItem('expired');
                return expired === null ? 60 : expired
            },
            changePush() {
                localStorage.setItem('push', this.push);
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

    .switch {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .expired {
        margin: 10px 0;
    }
</style>