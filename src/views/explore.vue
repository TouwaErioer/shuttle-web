<template>
    <div class="body" index>
        <!--轮播图-->
        <el-carousel height="150px" class="carousel" indicator-position="none">
            <el-carousel-item v-for="(ad,index) in ads" :key="index">
                <el-image :src="ad"></el-image>
            </el-carousel-item>
        </el-carousel>
        <!--服务区-->
        <div class="flex flex-wrap justify-sb">
            <div v-for="service in services" :key="service.id" class="cover-item theme-bg" hoverclass="hoverclass"
                 :style="'background-color:' + service.color" @click="$router.push('/service/' + service.id)">
                <span :class="service.icon" class="icon"></span>
                <p v-text="service.name"></p>
            </div>
        </div>
        <div style="overflow: scroll">
            <el-divider>
                <li class="el-icon-sort" @click="switchTop" v-text="top_switch?' 热门产品':' 热门商店'"> 热门服务
                </li>
            </el-divider>
            <!--热门商店-->
            <transition name="el-fade-in-linear">
                <div class="top-store" v-if="!top_switch">
                    <Item :item="item" v-for="item in popularStore" :key="item.id"
                          @click.native="$router.push('/store/' + item.id)">
                        <el-tag size="mini" v-text="item.services.name" effect="dark" class="item-tag"
                                :style="'border-color:' + item.services.color"
                                slot="tag" :color="item.services.color"/>
                        <div slot="sales"><i class="el-icon-medal"></i> 总销量：
                            <span>{{ + item.sales}}</span></div>
                    </Item>
                </div>
            </transition>
            <!--热门产品-->
            <transition name="el-fade-in-linear">
                <div class="top-product" v-if="top_switch">
                    <Item :item="item" v-for="item in popularProduct" :key="item.id" :price="true">
                        <el-tag size="mini" v-text="item.store.name" effect="dark" class="tag" type="warning"
                                slot="tag" @click="$router.push('/store/' + item.storeId)"/>
                        <div class="add" @click="addToCart(item)" slot="button">
                            <el-button size="mini" icon="el-icon-plus" round/>
                        </div>
                        <div slot="price"><i class="el-icon-price-tag"></i> 价格：
                            <span class="price-text" v-text="getPrice(item.price)"/>
                        </div>
                        <div slot="sales"><i class="el-icon-medal"></i> 销量：
                            <span>{{ + item.sales}}</span>
                        </div>
                    </Item>
                    <el-dialog title="提示" :visible.sync="dialogInputVisible" width="80%" center>
                        <div class="dialog">
                            <el-input placeholder="请输入取件号" v-model="value" class="dialog-control"
                                      suffix-icon="el-icon-chat-line-square" type="number"/>
                            <el-button size="medium" @click="checkInputDialog">确认
                            </el-button>
                        </div>
                    </el-dialog>
                    <el-dialog title="提示" :visible.sync="dialogUploadVisible" width="80%" center>
                        <div class="dialog">
                            <el-upload class="upload dialog-control"
                                       action="http://127.0.0.1:8081/file/upload"
                                       multiple
                                       :limit="1"
                                       :on-success="handleResult"
                                       :headers="{Authorization:getToken()}">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传不超过10MB的文件</div>
                            </el-upload>
                            <el-button size="medium" @click="checkUpdateDialog">确认
                            </el-button>
                        </div>
                    </el-dialog>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import mock from "@/mock";
    import Item from "@/components/item";
    import common from "@/utils/commont";
    import {findAllService} from "@/utils/api/service";
    import {findPopularStore} from "@/utils/api/store";
    import {findPopularProduct} from "@/utils/api/product";

    export default {
        name: "Explore",
        components: {Item},
        data() {
            return {
                services: [],
                top_switch: false,
                popularStore: [],
                popularProduct: [],
                dialogInputVisible: false,
                value: null,
                product: null,
                dialogUploadVisible: false,
                type: null
            }
        },
        created() {
            this.getService();
            this.getRankStores();
            this.getRankProduct();
        },
        computed: {
            getStores() {
                return mock.stores(1)
            },
            ads() {
                return mock.carouselImage()
            }
        },
        methods: {
            getService() {
                findAllService().then(res => {
                    if (res.code === 1) {
                        let services = res.data.list;
                        this.services = services;
                        sessionStorage.setItem('serviceList', JSON.stringify(services))
                    }
                });
            },
            getRankStores() {
                findPopularStore().then(res => {
                    if (res.code === 1) {
                        this.popularStore = res.data;
                    }
                })
            },
            getRankProduct() {
                findPopularProduct().then(res => {
                    if (res.code === 1) {
                        this.popularProduct = res.data;
                    }
                })
            },
            switchTop() {
                this.top_switch = !this.top_switch;
                let text = this.top_switch ? '热门商品' : '热门服务';
                this.$message({
                    message: '切换为' + text,
                    type: 'info',
                    duration: 800
                });
            },
            addToCart(product) {
                this.product = product;
                if (product.store.serviceId === 1) {
                    this.dialogInputVisible = true;
                } else if (product.store.serviceId === 2) {
                    this.dialogUploadVisible = true;
                } else {
                    this.toCart(product)
                }
            },
            toCart(product) {
                this.$store.commit('addCart', {
                    'id': product.id,
                    'data': {
                        'id': product.id,
                        'name': product.name,
                        'image': product.image,
                        'price': product.price,
                        'rate': product.rate,
                        'sales': product.sales,
                        'storeName': product.store.name,
                        'storeId': product.store.storeId,
                        'count': 1,
                        'extend': {
                            type: this.type,
                            value: this.value
                        }
                    }
                });
                this.$message({
                        message: '添加到购物车',
                        type: 'success'
                    }
                )
            },
            getPrice(price) {
                return common.changePrice(price)
            },
            checkInputDialog() {
                if (this.value != null && this.value !== '') {
                    this.dialogInputVisible = false;
                    this.type = 'note';
                    this.toCart(this.product)
                } else this.$message.error('请填写单号')
            },
            checkUpdateDialog() {
                if (this.value != null && this.value !== '') {
                    this.dialogUploadVisible = false;
                    this.type = 'file';
                    this.toCart(this.product)
                } else this.$message.error('请上传文件')
            },
            handleResult(response, file) {
                this.value = {
                    name: file.name,
                    url: response.data
                }
            },
            getToken() {
                return localStorage.getItem('token')
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../style/service";

    .carousel {
        margin-bottom: 20px
    }

    .el-carousel__item {
        border-radius: 15px !important;
    }

    .el-carousel {
        border-radius: 15px !important;
    }

    .dialog {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .dialog-control {
        margin: 10px 0;
    }

    .upload {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>