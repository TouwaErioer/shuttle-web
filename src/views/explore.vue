<template>
    <div class="body" index>
        <!--轮播图-->
        <el-carousel height="150px" class="carousel" indicator-position="none">
            <el-carousel-item v-for="(item,index) in image" :key="index">
                <el-image :src="item"></el-image>
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
                <li class="el-icon-sort" @click="top_switch = !top_switch" v-text="top_switch?' 热门商品':' 热门服务'"> 热门服务
                </li>
            </el-divider>
            <!--热门服务-->
            <transition name="el-fade-in-linear">
                <div class="top-store" v-if="!top_switch">
                    <Item :item="item" v-for="item in getStores" :key="item.id">
                        <el-tag size="mini" v-text="item.service" effect="dark" class="item-tag" type="warning"
                                slot="tag"/>
                    </Item>
                </div>
            </transition>
            <!--热门商品-->
            <transition name="el-fade-in-linear">
                <div class="top-product" v-if="top_switch">
                    <Item :item="item" v-for="item in getProduct" :key="item.id">
                        <el-tag size="mini" v-text="item.shop" effect="dark" class="item-tag" type="warning"
                                slot="tag"/>
                    </Item>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import mock from "@/mock";
    import Item from "@/components/item";

    export default {
        name: "Explore",
        components: {Item},
        data() {
            return {
                services: [],
                top_switch: false
            }
        },
        created() {
            this.getService()
        },
        computed: {
            getStores() {
                return mock.stores()
            },
            image() {
                return mock.carouselImage()
            },
            getProduct() {
                return mock.product()
            },
        },
        methods: {
            getService() {
                let services = mock.services()
                this.services = services
                sessionStorage.setItem('serviceList', JSON.stringify(services))
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
</style>