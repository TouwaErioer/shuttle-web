<template>
    <div>
        <el-tabs v-model="activeName" type="card" tab-position="bottom" :stretch="true">
            <el-tab-pane name="explore">
                <span slot="label"><i class="el-icon-goods"></i> 发现</span>
                <Explore/>
            </el-tab-pane>
            <el-tab-pane name="service">
                <span slot="label"><i class="el-icon-folder"></i> 服务</span>
                <Service/>
            </el-tab-pane>
            <el-tab-pane name="search">
                <span slot="label"><i class="el-icon-search"></i> 搜索</span>
                <Search/>
            </el-tab-pane>
            <el-tab-pane name="center">
                <span slot="label"><i class="el-icon-user" slot="label"></i> 我的</span>
                This is center tab
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Explore from "../views/explore"
    import Service from "@/views/service";
    import Search from "@/views/search";

    export default {
        name: "skeleton",
        components: {
            Search,
            Service,
            Explore
        },
        data() {
            return {
                activeName:'explore',
            }
        }
    };
</script>

<style lang="scss">
    @import "src/style/header.scss";
    /*cover vue-slide-tabs style*/
    .scroll-bar {
        border-bottom: 0px !important;
        border-radius: 0px !important;
    }

    .tabs-titles {
        position: unset !important;
    }

    .tabs-titles::after {
        position: unset !important;
    }

    .tip {
        height: 100%;
    }

    .tab-container {
        height: 100%;
    }

    .tabs-content {
        overflow: hidden scroll !important;
    }
    .el-tabs__header{
        position: fixed!important;
        bottom: 0px!important;
        background: white!important;
        width: 100%!important;
        text-align: center!important;
    }
    .el-tab-pane{
        margin-bottom: 50px;
    }
</style>