<template>
    <Page>
        <template v-slot:headers>
            <Headers>
                <span><i class="el-icon-star-off"></i> 审批</span>
            </Headers>
        </template>
        <template v-slot:center>
            <el-tabs v-model="activeName" type="card" :stretch="true" style="height: 100%;">
                <el-tab-pane name="store">
                    <span slot="label"><i class="el-icon-s-shop"></i> 商店</span>
                    <div class="approve-box">
                        <el-input v-model="store.name" prefix-icon="el-icon-s-shop" placeholder="请输入商店名称"/>
                        <el-input v-model="store.image" prefix-icon="el-icon-picture" placeholder="请输入商店图片图床链接"/>
                        <div class="select-box">
                            <div class="select-title">服务</div>
                            <div>
                                <el-tag
                                        :key="service.id"
                                        v-for="service in services"
                                        closable
                                        :disable-transitions="false"
                                        v-text="service.name"
                                        effect="dark"
                                        @click="select.service = {id :service.id,name:service.name}"
                                        :color="service.color" :style="'border-color: ' + service.color"
                                        class="tag">
                                </el-tag>
                            </div>
                        </div>
                        <div class="select-box">
                            <div class="select-title">类别</div>
                            <div>
                                <el-tag
                                        :key="category.id"
                                        v-for="category in categories"
                                        closable
                                        :disable-transitions="false"
                                        :type="category.id === 0 ? 'success' : ''"
                                        v-text="category.name"
                                        effect="dark"
                                        @click="select.category = {id:category.id,name:category.name}"
                                        class="tag">
                                </el-tag>
                                <el-input
                                        class="input-new-tag"
                                        v-if="inputVisible"
                                        v-model="inputValue"
                                        ref="saveTagInput"
                                        size="small"
                                        @keyup.enter.native="handleInputConfirm"
                                        @blur="handleInputConfirm"
                                >
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加
                                </el-button>
                            </div>
                        </div>
                        <div class="select">
                            <div>
                                <span>已选服务 </span>
                                <span v-if="select.service === null"
                                      class="select-txt">未选择</span>
                                <el-tag v-else v-text="select.service.name"/>
                            </div>
                            <div>
                                <span>已选类别 </span>
                                <span v-if="select.category === null"
                                      class="select-txt">未选择</span>
                                <el-tag v-else v-text="select.category.name"/>
                            </div>
                        </div>
                        <div class="btn">
                            <el-button @click="addStore">添加商店</el-button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane name="product">
                    <span slot="label"><i class="el-icon-goods"></i> 产品</span>
                    <div class="approve-box">
                        <el-input v-model="product.name" prefix-icon="el-icon-goods" placeholder="请输入产品名称"></el-input>
                        <el-input v-model="product.image" prefix-icon="el-icon-picture"
                                  placeholder="请输入产品图片图床链接"></el-input>
                        <el-input v-model="product.price" prefix-icon="el-icon-price-tag" placeholder="请输入产品价格"
                                  type="number"></el-input>
                        <el-select v-model="storeName" :placeholder="stores.length === 0 ? '当前用户暂无商店' : '请选择'"
                                   :disabled="stores.length === 0" style="width: 100%;">
                            <el-option
                                    v-for="store in stores"
                                    :key="store.name"
                                    :label="store.name"
                                    :value="store.name">
                            </el-option>
                        </el-select>
                        <div class="btn">
                            <el-button @click="addProduct">添加产品</el-button>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </template>
    </Page>
</template>

<script>

    import Page from "@/layout/page";
    import Headers from "@/components/headers";
    import common from "@/utils/commont";
    import {findAllService} from "@/utils/api/service";
    import {findAllCategories} from "@/utils/api/category";
    import {findStoreByUserId, insertProduct, insertStore} from "@/utils/api/approve";

    export default {
        name: "order",
        components: {Headers, Page},
        data() {
            return {
                activeName: 'store',
                userInfo: null,
                store: {
                    name: null,
                    image: null,
                },
                services: [],
                inputVisible: false,
                inputValue: '',
                categories: [],
                select: {
                    service: null,
                    category: null
                },
                product: {
                    name: null,
                    image: null,
                    price: null
                },
                stores: [],
                storeName: null
            }
        },
        computed: {
            getUserInfo: function () {
                return common.getUserInfo()
            }
        },
        created() {
            this.getService();
            this.getCategories();
            this.findStoreByUserId();
        },
        methods: {
            getService() {
                findAllService().then(res => {
                    if (res.code === 1) {
                        this.services = res.data.list;
                    }
                });
            },
            showInput() {
                this.inputVisible = true;
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.categories.push({
                        id: 0,
                        name: inputValue
                    });
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            getCategories() {
                findAllCategories().then(res => {
                    if (res.code === 1) {
                        this.categories = res.data.list;
                    }
                })
            },
            help() {
                let content = '用户添加商店、产品，添加后会发送到后台审核';
                this.$confirm(content, '帮助', {
                    type: 'warning'
                }).then(() => {
                }).catch(() => {
                });
            },
            addProduct() {
                if (this.stores.length === 0) {
                    this.$message.info('当前用户暂无商店，跳转到添加商店');
                    this.activeName = 'store';
                } else if (!Object.values(this.product).every(v => !!v)) {
                    this.$message.error('输入格式有误');
                } else {
                    const userId = this.getUserInfo.id;
                    insertProduct({
                        uid: userId,
                        name: this.product.name,
                        image: this.product.image,
                        price: this.product.price,
                        storeName: this.storeName
                    }).then(res => {
                        if (res.code === 1) {
                            this.$message.success('已交由后台批准，通过将发送邮件提示')
                        }
                    })
                }
            },
            findStoreByUserId() {
                const userId = common.getUserInfo().id;
                findStoreByUserId(userId).then(res => {
                    if (res.code === 1) {
                        this.stores = res.data;
                    }
                })
            },
            addStore() {
                const userId = this.getUserInfo.id;
                if (!Object.values(this.store).every(v => !!v) || !Object.values(this.select).every(v => !!v)) {
                    this.$message.error('输入格式有误，必填项未填');
                } else {
                    insertStore({
                        uid: userId,
                        name: this.store.name,
                        image: this.store.image,
                        serviceId: this.select.service.id,
                        categoryId: this.select.category.id,
                        categoryName: this.select.category.name
                    }).then(res => {
                        if (res.code === 1) {
                            this.$message.success('已交由后台批准，通过将发送邮件提示');
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>

    .approve-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80%;
        height: 100%;
        justify-content: center;
        margin: auto;
    }

    .approve-box > .el-input {
        margin: 5px 0;
    }

    .approve-box > .el-select {
        margin: 5px 0;
    }

    .btn > .el-button {
        margin: 5px 0;
    }

    .el-tag + .el-tag {
        margin-left: 10px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    .store > div {
        margin: 5px;
    }

    .btn {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .select-txt {
        color: gray;
        font-size: 12px;
    }

    .select {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .select > div {
        margin: 10px 5px;
    }

    .select-box {
        margin: 10px 0;
    }

    .tag {
        margin: 3px 0;
    }

    .select-title {
        text-align: center;
        margin: 3px 0;
    }
</style>