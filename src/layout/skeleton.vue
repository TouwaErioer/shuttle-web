<template>
    <div>
        <Tabs :tabs="tabs" class="tab-container">
            <div class="tip">
                <Explore/>
            </div>
            <div class="tip">This is order tab</div>
            <div class="tip">This is search tab</div>
            <div class="tip">This is center tab</div>
        </Tabs>
    </div>
</template>

<script>
    import Tabs from "vue-slide-tabs";
    import Explore from "../views/explore"

    export default {
        name: "skeleton",
        components: {
            Tabs,
            Explore
        },
        data() {
            return {
                tabs: [
                    {
                        label: "发现"
                    },
                    {
                        label: "订单"
                    },
                    {
                        label: "搜索"
                    },
                    {
                        label: "我的"
                    }
                ]
            }
        }
    };
</script>

<style>
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
</style>