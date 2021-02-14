<template>
    <Page>
        <template v-slot:headers>
            <Headers>
                <span><i class="el-icon-shopping-bag-2"></i> 商店详情</span>
            </Headers>
            <div style="overflow: hidden;" v-if="store != null">
                <div class="info-background"
                     :style="'background:url(' + store.image + ');background-size: cover'"></div>
                <div class="info">
                    <item :item="store" :color="false">
                        <el-tag size="mini" v-text="'外卖'" effect="dark" class="item-tag" type="warning"
                                style="font-size:2vh;height: unset"></el-tag>
                        <div slot="sales"><i class="el-icon-medal"></i> 总销量：
                            <span>{{ + store.sales}}</span>
                        </div>
                    </item>
                </div>
            </div>
        </template>
        <template v-slot:center>
            <div>
                <el-tabs v-model="activeName" type="card" :stretch="true">
                    <el-tab-pane name="product">
                        <span slot="label"><i class="el-icon-goods"></i> 商品</span>
                        <div class="content">
                            <div class="products">
                                <Item v-for="product in products" :key="product.id" :item="product" :price="true">
                                    <div class="add" @click="addToCart(product)" slot="button">
                                        <el-button size="mini" icon="el-icon-plus" round/>
                                    </div>
                                    <div slot="price"><i class="el-icon-price-tag"></i> 价格：
                                        <span class="price-text" v-text="getPrice(product.price)"/>
                                    </div>
                                    <div slot="sales"><i class="el-icon-medal"></i> 销量：
                                        <span>{{ + product.sales}}</span>
                                    </div>
                                </Item>
                            </div>
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
                                               action="/api/file/upload"
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
                    </el-tab-pane>
                    <el-tab-pane name="comment">
                        <span slot="label"><i class="el-icon-chat-line-square"></i> 评论</span>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </template>
        <template v-slot:footer>
            <div class="cart">
                <div class="car-button" @click="$router.push('/cart')">
                    <span><i class="el-icon-shopping-cart-1"></i> 购物车 {{getCount}}</span>
                </div>
            </div>
        </template>
    </Page>
</template>

<script>
    import Headers from "@/components/headers";
    import Item from "@/components/item"
    import Page from "@/layout/page";
    import common from "@/utils/commont";
    import {findProductsByStoreId} from "@/utils/api/product";
    import {findStoreById} from "@/utils/api/store";

    export default {
        name: "store",
        components: {Page, Headers, Item},
        props: ['sid'],
        data() {
            return {
                products: [],
                store: null,
                activeName: 'product',
                dialogInputVisible: false,
                value: null,
                product: null,
                dialogUploadVisible: false,
                type: null
            }
        },
        created() {
            this.getProducts();
            this.getStore();
        },
        methods: {
            addToCart(product) {
                this.product = product;
                if (product.store.serviceId === 4) {
                    this.dialogInputVisible = true;
                } else if (product.store.serviceId === 2) {
                    this.dialogUploadVisible = true;
                } else {
                    this.toCart(product);
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
                        },
                        'serviceId': product.store.serviceId
                    }
                });
                this.$message({
                        message: '添加到购物车',
                        type: 'success',
                        duration: 800
                    }
                )
            },
            getPrice(price) {
                return common.changePrice(price);
            },
            getProducts() {
                if (this.$store.getters.productsCache(parseInt(this.sid))) {
                    this.products = this.$store.getters.getProducts(this.sid);
                    console.log('缓存storeId为' + this.sid + '的products');
                } else {
                    console.log('获取storeId为' + this.sid + '的products');
                    findProductsByStoreId(this.sid).then(res => {
                        if (res.code === 1) {
                            this.products = res.data;
                            this.$store.commit('setProducts', this.products)
                        }
                    })
                }
            },
            getStore() {
                let storeList = this.$store.getters.getStoreById(this.sid);
                if (storeList.length === 0) {
                    findStoreById(this.sid).then(res => {
                        if (res.code === 1) {
                            this.store = res.data[0];
                        }
                    });
                } else this.store = storeList[0];
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
        },
        computed: {
            getCount() {
                return this.$store.getters.getCount
            }
        }
    }
</script>

<style scoped>
    .products {
        margin: 5px;
    }

    .cart {
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .add {
        float: right;
    }

    .info {
        margin-left: 5px;
        color: white;
        position: absolute;
        top: 50px;
    }

    .car-button {
        color: white;
        margin: 5px;
        width: 100%;
        height: 80%;
        background: #409EFF;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .info-background {
        width: 100%;
        height: 135px;
        background-size: cover;
        transform: scale(1.02);
        filter: blur(3px);
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