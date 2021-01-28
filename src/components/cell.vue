<template>
    <div class="cell flex" v-bind:[type]="type" :flex="flex">
        <header>
            <div class="title" v-if="title" v-text="title" />
            <i v-else-if="icon" :class="'el-icon-' + icon" />
            <slot v-else name="header" />
        </header>
        <main flex="1">
            <div v-if="text" v-text="text" />
            <slot v-else />
        </main>
        <footer class="flex" flex="align-items_center">
            <slot name="footer" />
            <i
                v-if="access"
                class="el-icon-arrow-right"
                style="opacity:.8"
            />
        </footer>
    </div>
</template>

<script>
export default {
    name: "cell",
    props: {
        title: String,
        icon: String,
        text: String,
        flex: {
            type:String,
            default:"align-items_center"
        },
        access: Boolean,
    },
};
</script>

<style lang="scss" scoped>
.cell {
    padding: 15px;
    > header {
        > .title,
        > i {
            margin-right: 15px;
        }
    }
}
</style>