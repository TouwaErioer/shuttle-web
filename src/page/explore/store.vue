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
                                        <div class="add" @click="add(product)">
                                            <el-button type="success" size="mini" icon="el-icon-circle-plus-outline"
                                                       round>
                                                1￥
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
            add(product) {
                this.$store.commit('addProductToCart', product)
                this.$message({
                        message: '添加到购物车',
                        type: 'success'
                    }
                )
            },
        },
        computed: {
            getCount() {
                return this.$store.getters.getCount
            }
        }
    }
</script>

<style>

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

    .el-tabs__header {
        margin: unset !important;
    }

    .el-tabs {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .el-tabs__content {
        flex: 1;
        overflow-y: scroll;
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