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
        <!--热门服务-->
        <div style="overflow: scroll">
            <el-divider>
                <li class="el-icon-shopping-cart-2"> 热门服务</li>
            </el-divider>
            <StoreItem :item="item" v-for="item in getProducts" :key="item.id"/>
        </div>
    </div>
</template>

<script>
    import mock from "@/mock";
    import StoreItem from "@/components/store-item";

    export default {
        name: "Explore",
        components: {StoreItem},
        data(){
            return{
                services:[]
            }
        },
        created(){
            let services = mock.services()
            this.services = services
            this.$store.commit('setServices',services)
        },
        computed: {
            getProducts() {
                return mock.product()
            },
            image(){
                return mock.carouselImage()
            },
        }
    };
</script>

<style scoped lang="scss">
    @import "../style/service";

    .carousel {
        margin-bottom: 20px
    }
    .el-carousel__item{
        border-radius: 15px!important;
    }
    .el-carousel{
        border-radius: 15px!important;
    }
</style>