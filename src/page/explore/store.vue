<template>
    <Page>
        <template v-slot:headers>
            <Headers>
                <span><i class="el-icon-shopping-bag-2"></i> 商店详情</span>
            </Headers>
            <div style="overflow: hidden;">
                <div class="info-background" :style="'background:url(' + store.image + ');background-size: cover'"></div>
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
    import mock from "@/mock";
    import Item from "@/components/item"
    import Page from "@/layout/page";
    import common from "@/utils/commont";

    export default {
        name: "store",
        components: {Page, Headers, Item},
        props: ['sid'],
        data() {
            return {
                products: [],
                store: null,
                activeName: 'product',
            }
        },
        created() {
            this.getProducts()
            this.getStore()
        },
        methods: {
            addToCart(product) {
                this.$store.commit('addCart', {
                    'id': product.id,
                    'data': {
                        'id': product.id,
                        'name': product.name,
                        'image': product.image,
                        'price': product.price,
                        'rate': product.rate,
                        'sales': product.sales,
                        'shop': product.shop,
                        'count': 1
                    }
                })
                this.$message({
                        message: '添加到购物车',
                        type: 'success',
                        duration: 800
                    }
                )
            },
            getPrice(price) {
                return common.changePrice(price)
            },
            getProducts(){
                if (this.$store.getters.productsCache(parseInt(this.sid))) {
                    this.products = this.$store.getters.getProducts(this.sid)
                    console.log('缓存sid为' + this.sid + '的products')
                }
                else {
                    console.log('获取sid为' + this.sid + '的products')
                    let products = mock.product(this.sid)
                    this.products = products
                    this.$store.commit('setProducts', products)
                }
            },
            getStore(){
                let storeList = this.$store.getters.getStoreById(this.sid)
                if(storeList.length == 0){
                    this.store = mock.getStores().filter(store => store.id == this.products[0].sid)[0]
                }else this.store = storeList[0]
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

    .info-background{
        width:100%;
        height:135px;
        background-size:cover;
        transform: scale(1.02);
        filter:blur(3px);
    }

    /*.info-background::before{*/
    /*    content:'';*/
    /*    position:absolute;*/
    /*    top:0;*/
    /*    left:0;*/
    /*    width:100%;*/
    /*    height:135px;*/
    /*    filter:blur(3px);*/
    /*    z-index:-1;*/
    /*    background:url('https://www.foodiesfeed.com/wp-content/uploads/2021/01/korean-spicy-seafood-soup-with-king-prawns-from-top-view-768x512.jpg');*/
    /*    background-size:cover;*/
    /*    transform: scale(1.02)*/
    /*}*/
</style>