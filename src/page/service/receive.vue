<template>
    <Page>
        <template v-slot:headers>
            <Headers>
                <span><i class="el-icon-sell"></i> 接单</span>
            </Headers>
        </template>
        <template v-slot:center>
            <div>center</div>
        </template>
    </Page>
</template>

<script>
    import Page from "@/layout/page";
    import Headers from "@/components/headers";

    export default {
        name: "receive",
        components: {Headers, Page}
    }
</script>

<style scoped>

</style>