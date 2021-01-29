<template>
    <div class="container">
        <Headers>
            <span><i class="el-icon-shopping-cart-1"></i> 购物车</span>
        </Headers>
        <div class="address-wrap" @click="more = !more">
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
                <i :class="more? 'el-icon-arrow-up':'el-icon-arrow-down'" class="arrow"></i>
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
        <div class="content">
            <div class="create-order">
                <Item v-for="(item, index) in cartList" :key="index" :item="item" :price="true" :count="item.count">
                    <template v-slot:button>
                        <el-input-number v-model="item.count" :min="0" size="mini" style="width: 40%;"
                                         @change="handleChange(item.id,item.count)"/>
                    </template>
                    <el-tag size="mini" v-text="item.shop" effect="dark" class="item-tag" type="warning"
                            style="font-size:2vh"></el-tag>
                </Item>
            </div>
        </div>
        <div class="pay-wrap">
            <div class="price">
                <span><i class="el-icon-price-tag"></i> 商品金额（运费 ¥1）</span>
                <span>共计：<span class="count">¥{{ 0 }}</span></span>
            </div>
            <el-button class="pay-btn" type="primary" icon="el-icon-download" :disabled="cartList.length == 0">下单
            </el-button>
        </div>
    </div>
</template>

<script>
    import Headers from "@/components/headers";
    import Item from "@/components/item"

    export default {
        name: "cart",
        components: {Headers,Item},
        data() {
            return {
                user: {
                    'email': 'adim@hope.com',
                    'address': 'test'
                },
                more: false,
                isExpired: false,
                cartList: this.$store.getters.getProducts,
            }
        },
        methods: {
            handleChange(pid, count) {
                this.$store.commit('changeCart', {'pid': pid, 'count': count})
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
</style>