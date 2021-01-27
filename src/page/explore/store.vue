<template>
    <div>
        <Headers>
            <span><i :class="icon"></i> {{title}}</span>
        </Headers>
        <div class="stores">
            <store-item v-for="store in stores" :key="store.id" :item="store"/>
        </div>
    </div>
</template>

<script>
    import Headers from "@/components/headers";
    import mock from "@/mock";
    import StoreItem from "@/components/store-item";

    export default {
        name: "store",
        props: ['id'],
        components: {StoreItem, Headers},
        data() {
            return {
                title: null,
                icon: null,
                stores: []
            }
        },
        created() {
            let service = this.$store.state.services.get(parseInt(this.id))
            this.stores = mock.stores()
            this.title = service['name']
            this.icon = service['icon']
        },
        methods: {}
    }
</script>

<style scoped>
    .stores{
        margin: 38px 10px;
    }
</style>