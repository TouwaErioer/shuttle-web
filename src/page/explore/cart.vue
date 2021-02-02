<template>
    <Page>
        <template v-slot:headers>
            <Headers>
                <span><i class="el-icon-shopping-cart-1"></i> 购物车</span>
            </Headers>
            <div class="address-wrap">
                <div class="wrap">
                    <div>
                        <div class="email">
                            <i class="el-icon-user"></i>
                            <span v-text="' ' + user.email"></span>
                        </div>
                        <div class="address">
                            <i class="el-icon-school"></i>
                            <span v-text="' ' + user.address"></span>
                        </div>
                    </div>
                    <i :class="more? 'el-icon-arrow-up':'el-icon-arrow-down'" class="arrow" @click="more = !more"></i>
                </div>
                <transition name="slide-fade">
                    <div class="options">
                        <el-form status-icon ref="ruleForm" v-if="more">
                            <el-form-item>
                                <el-input placeholder="备注" type="textarea" :rows="3"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-switch
                                        v-model="isExpired"
                                        active-text="自动取消（超过15分钟未有人接单）">
                                </el-switch>
                            </el-form-item>
                        </el-form>
                    </div>
                </transition>
            </div>
        </template>
        <template v-slot:center>
            <Item v-for="(item, index) in cartList" :key="index" :item="item[1]" :price="true"
                  :count="item[1].count">
                <el-input-number v-model="item[1].count" :min="0" size="mini" style="width: 90px;"
                                 @change="(currentValue, oldValue) => {change(currentValue, oldValue, item[1].id)}"
                                 slot="button"/>
                <el-tag size="mini" v-text="item[1].shop" effect="dark" class="tag" type="warning" slot="tag"/>
                <div slot="price"><i class="el-icon-price-tag"></i> 价格：
                    <span class="price-text" v-text="getPrice(item[1].price)"/>
                </div>
                <div slot="sales"><i class="el-icon-medal"></i> 销量：
                    <span>{{ + item[1].sales}}</span>
                </div>
            </Item>
            <Empty description="购物车暂无商品" v-if="getCount == 0"/>
        </template>
        <template v-slot:footer>
            <div class="pay-wrap">
                <div class="total-price">
                    <span><i class="el-icon-price-tag"></i> 商品金额（运费 ¥1）</span>
                    <span>共计：<span class="count">¥{{ totalPrice }}</span></span>
                </div>
                <el-button class="pay-btn" type="primary" icon="el-icon-download" :disabled="getCount == 0"
                           @click="submit">下单
                </el-button>
            </div>
        </template>
    </Page>
</template>

<script>

    import Page from "@/layout/page";
    import Headers from "@/components/headers"
    import Item from "@/components/item"
    import common from "@/utils/commont";
    import Empty from "@/components/empty";

    export default {
        name: "cart",
        components: {Empty, Page, Headers, Item},
        data() {
            return {
                user: {
                    'email': 'adim@hope.com',
                    'address': 'test'
                },
                more: false,
                cartList: Array.from(this.$store.getters.getCartMap),
                isExpired: false
            }
        },
        computed: {
            getCount() {
                return this.$store.getters.getCount
            },
            totalPrice() {
                if (this.getCount != 0) {
                    let count = 100
                    this.$store.getters.getCartMap.forEach(function (product) {
                        count += product.count * product.price
                    })
                    return common.changePrice(count)
                } else return '0.00'
            }
        },
        methods: {
            change(currentValue, oldValue, id) {
                this.$store.commit('changeCart',
                    {'currentValue': currentValue, 'oldValue': oldValue, 'id': id})
            },
            getPrice(price) {
                return common.changePrice(price);
            },
            submit() {
                let orders = []
                this.$store.getters.getCartMap.forEach(function (value) {
                    orders.push(value)
                })
                console.log(orders)
                this.$store.commit('clear')
                this.$message({
                    message: '下单成功',
                    type: 'success'
                })
                this.$router.push('/order')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/cart';

    .content {
        width: 100%;
        flex: 1;
        overflow-y: scroll;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */
    {
        transform: translateY(10px);
        opacity: 0;
    }

    .price {
        font-size: 3vh;
        color: #f56c6c;
    }

    .label {
        margin-left: 3px;
    }
</style>