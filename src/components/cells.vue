<template>
    <div class="cells">
        <slot />
    </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.cells {
    margin: 20px 0;
    background-color: #fff;
    border-radius: 8px;

    > * {
        position: relative;
    }
    > *:before {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        color: rgba(0, 0, 0, 0.1);
        color: var(--weui-FG-3);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        left: 16px;
        z-index: 2;
    }

    > *:first-child:before {
        content: none;
    }
}
</style>