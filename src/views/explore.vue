<template>
    <div class="body" index style="padding-top: 10px;">
        <!--轮播图-->
        <el-carousel height="150px" class="carousel" indicator-position="none">
            <el-carousel-item v-for="(item,index) in image" :key="index">
                <el-image :src="item"></el-image>
            </el-carousel-item>
        </el-carousel>
        <!--服务区-->
        <div class="flex flex-wrap justify-sb">
            <div
                    v-for="service in services"
                    :key="service.id"
                    class="cover-item theme-bg"
                    hoverclass="hoverclass"
                    :style="'background-color:' + service.color">
                <span :class="service.icon" style="font-size: 25px;margin: 5px"></span>
                <p v-text="service.name"></p>
            </div>
        </div>
        <!--热门服务-->
        <div>
            <el-divider>
                <li class="el-icon-shopping-cart-2"> 热门服务</li>
            </el-divider>
            <div v-for="item in getProducts" class="list-item" :key="item.id">
                <el-image class="item-image" :src="item.image" fit="cover"/>
                <div type="flex" class="goods-info">
                    <div class="item-info">
                        <el-tag size="mini" v-text="item.shop" effect="dark" class="item-tag" type="warning"></el-tag>
                        <span v-text="item.name" class="item-name"></span>
                    </div>
                    <div class="item-desc">
                        <el-rate v-model="item.rate" disabled text-color="#ff9900" show-score>
                        </el-rate>
                    </div>
                    <div class="item-tag">
                        <span v-text="'销量：' + item.sales"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mock from "@/mock";

    export default {
        name: "Explore",
        computed: {
            getProducts() {
                return mock.product()
            },
            image(){
                return mock.carouselImage()
            },
            services(){
               return mock.services()
            }
        }
    };
</script>

<style scoped lang="scss">
    .carousel {
        margin-bottom: 20px
    }
    .body {
        position: absolute;
        left: 0;
        top: 0;
        padding: 0 15px;
        overflow: auto;
    }

    .tab {
        margin: 2vw 0;
    }

    .flex {
        display: flex;
        align-items: center;
    }

    .tab {
        margin: 2vw 0;
    }

    .flex {
        display: flex;
        align-items: center;
    }

    .tab-item {
        color: #353535;
        text-align: center;
        line-height: 2.6;
        color: #878787;
    }

    .flex-1 {
        flex: 1;
    }

    .swiper {
        height: 26vw;
        border-radius: 10px;
        box-shadow: 0 10px 10px -4px rgba(106, 182, 252, .15);
    }

    .flex-wrap {
        flex-wrap: wrap;
    }

    .justify-sb {
        justify-content: space-between;
    }

    .cover-item {
        margin-bottom: 15px;
        width: 28vw;
        height: 28vw;
        border-radius: 15px;
        opacity: .95;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #f2f6fc;
    }

    .theme-bg {
        background: #6ab6fc;
    }

    [hoverclass] {
        transition: background .3s;
    }

    .tab-item:nth-child(2),
    .tab-item-active {
        transform: scale(1.2);
        font-weight: bold;
        color: #3a3a3a;
    }


    .list-item {
        display: flex;
        background-color: #ffffff;
        border-bottom: 1px solid #dddddd;
        font-size: smaller;
        padding-bottom: 10px;

        & > * {
            margin: 5px;
        }

        .goods-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;

            .item-desc {
                margin: 3px;
                font-size: 20px;
            }

            .create {
                align-self: flex-end;
            }
        }
    }

    .el-tag--mini {
        height: 18px;
        line-height: 17px;
    }

    .el-tag {
        font-size: 5px;
    }

    .item-image {
        width: 100px;
        height: 100px;
        margin-top: 10px
    }

    .item-info {
        margin-top: 8px;
    }

    .item-name {
        margin: 3px;
        font-size: 18px
    }

    .item-tag {
        margin: 3px;
    }

    .item-button {
        float: right;
    }
    .el-carousel__item{
        border-radius: 15px!important;
    }
    .el-carousel{
        border-radius: 15px!important;
    }
</style>