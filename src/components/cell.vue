<template>
    <div class="cell flex" :flex="flex" v-on="$listeners">
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
                :class="{ light: accessLight }"
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
            type: String,
            default: "align-items_center",
        },
        access: Boolean,
        accessLight: Boolean,
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

    > footer {
        > i.el-icon-arrow-right {
            color: rgba(0, 0, 0, 0.3);
            &.light {
                color: rgba(255, 255, 255, 0.7);
            }
        }
    }
}
</style>