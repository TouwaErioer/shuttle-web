<template>
    <Page>
        <template v-slot:headers>
            <Headers>
                <span><i class="el-icon-shopping-bag-2"></i> 商店详情</span>
            </Headers>
            <div :style="'background-image:url(' + store.image + ')'">
                <div class="info">
                    <item :item="store" :color="false">
                        <el-tag size="mini" v-text="'外卖'" effect="dark" class="item-tag" type="warning"
                                style="font-size:2vh;height: unset"></el-tag>
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
                                <Item v-for="product in products" :key="product.id" :item="product">
                                    <template v-slot:button>
                                        <div class="add" @click="addToCart(product)">
                                            <el-button type="success" size="mini" icon="el-icon-circle-plus-outline"
                                                       round>{{getPrice(product.price)}}
                                            </el-button>
                                        </div>
                                    </template>
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
        props: ['id'],
        data() {
            return {
                products: [],
                store: null,
                activeName: 'product',
            }
        },
        created() {
            let products = mock.product()
            this.products = products
            this.store = products[0]
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
                        'shop': product.shop,
                        'count': 1
                    }
                })
                this.$message({
                        message: '添加到购物车',
                        type: 'success',
                        duration: 500
                    }
                )
            },
            getPrice(price){
                return common.changePrice(price)
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
</style>