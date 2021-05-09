<template>
    <Page>
        <template v-slot:headers>
            <Headers>
                <span><i class="el-icon-star-off"></i> 收藏</span>
            </Headers>
        </template>
        <template v-slot:center>
            <el-tabs v-model="activeName" type="card" :stretch="true" style="height: 100%;">
                <el-tab-pane name="store">
                    <span slot="label"><i class="el-icon-s-shop"></i> 商店</span>
                    <template v-if="activeName === 'store'">
                        <Item v-for="star in stars" :key="star.id" :item="star.store">
                            <div slot="sales" v-if="star.store !== null">
                                <i class="el-icon-medal"></i> 总销量：<span>{{star.store.sales}}</span>
                            </div>
                            <el-button slot="star" size="mini" @click="unStar(star.id)">取消收藏</el-button>
                        </Item>
                        <Empty :description="description" :svg="require('@/assets/undraw_mpty_street.svg')"
                               v-if="stars.length === 0"/>
                    </template>
                </el-tab-pane>
                <el-tab-pane name="product">
                    <span slot="label"><i class="el-icon-goods"></i> 产品</span>
                    <template v-if="activeName === 'product'">
                        <Item v-for="star in stars" :key="star.id" :item="star.product" :price="true"
                              @click.native="unStar(star.id)">
                            <div slot="button" @click.stop.prevent>
                                <ProductDialog :product="star.product"/>
                            </div>
                            <div slot="price" v-if="star.product !== null">
                                <i class="el-icon-price-tag"></i> 价格：
                                <span class="price-text" v-text="changePrice(star.product.price)"/>
                            </div>
                            <div slot="sales" v-if="star.product !== null">
                                <i class="el-icon-medal"></i> 销量：
                                <span>{{star.product.sales}}</span>
                            </div>
                        </Item>
                        <Empty :description="description" :svg="require('@/assets/undraw_mpty_street.svg')"
                               v-if="stars.length === 0"/>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </template>
    </Page>
</template>

<script>

    import Page from "@/layout/page";
    import Headers from "@/components/headers";
    import Item from "@/components/item"
    import {findStarByProduct, findStarByStore, unStar} from "@/utils/api/star";
    import common from "@/utils/commont";
    import ProductDialog from "@/components/product-dialog";
    import Empty from "@/components/empty";

    export default {
        name: "order",
        components: {Empty, ProductDialog, Headers, Page, Item},
        data() {
            return {
                activeName: 'store',
                pageNo: 1,
                pageSize: 9,
                stars: [],
                userInfo: null
            }
        },
        computed: {
            changePrice() {
                return (price) => {
                    return common.changePrice(price);
                }
            },
            description(){
                return this.activeName === 'store' ? '暂无商店收藏' : '暂无产品收藏';
            }
        },
        created() {
            this.getData();
            this.getUserInfo();
        },
        methods: {
            getStores() {
                findStarByStore(this.pageNo, this.pageSize).then(res => {
                    if (res.code === 1) this.stars = res.data.list;
                });
            },
            getProducts() {
                findStarByProduct(this.pageNo, this.pageSize).then(res => {
                    if (res.code === 1) this.stars = res.data.list;
                });
            },
            getData() {
                if (this.activeName === 'store') {
                    this.getStores();
                } else if (this.activeName === 'product') {
                    this.getProducts();
                }
            },
            unStar: function (id) {
                this.$confirm('确认取消收藏?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    unStar({
                        id: id,
                        uid: this.userInfo.id
                    }).then(res => {
                        if (res.code === 1) {
                            this.$message.success('已取消收藏');
                            this.getData();
                        }
                    });
                }).catch(() => {
                });
            },
            getUserInfo() {
                this.userInfo = common.getUserInfo();
            }
        },
        watch: {
            activeName() {
                this.getData();
            }
        }
    }
</script>

<style scoped>
</style>