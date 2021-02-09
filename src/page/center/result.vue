<template>
    <Page>
        <Headers slot="headers">

            <span><i class="el-icon-wallet"></i> 支付结果</span>
        </Headers>
        <div slot="center" class="container">
            <el-button :icon="status == 1?'el-icon-circle-check':'el-icon-circle-close'" @click="$router.push('/home')"
                       :type="status == 1?'success':'danger'" plain>
                {{status == 1?'成功':'失败'}}
            </el-button>
        </div>
    </Page>

</template>

<script>
    import Headers from "@/components/headers";
    import Page from "@/layout/page";

    export default {
        name: "result",
        components: {Page, Headers},
        props: ['status']
    }
</script>

<style scoped>
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>