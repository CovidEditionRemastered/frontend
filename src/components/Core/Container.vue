<template>
    <div :style="Style">
        <slot/>
    </div>
</template>

<style lang='scss' scoped>

</style>

<script lang='ts'>
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
    export default class Container extends Vue {
        @Prop({default: undefined}) maxHeight?: boolean | number;
        @Prop({default: undefined}) maxWidth?: boolean | number;


        get element(): HTMLElement {
            return document.getElementById('main-page')!;
        }


        width = 0;
        height = 0;

        mounted() {
            this.onResize();
        }

        onResize() {
            this.width = this.element.offsetWidth;
            this.height = this.element.style.getPropertyValue('min-height').Remove("px").ToInt();
        }

        get Style() {
            let style: any = {};
            if (this.maxHeight !== undefined) {
                if (typeof this.maxHeight === "boolean" && this.maxHeight) {
                    style.height = this.height;
                } else if (typeof this.maxHeight === "number") {
                    style.height = this.maxHeight * this.height;
                }
            }
            if (this.maxWidth !== undefined) {
                if (typeof this.maxWidth === "boolean" && this.maxWidth) {
                    style.width = this.width;
                } else if (typeof this.maxWidth === "number") {
                    style.width = this.maxWidth * this.width;
                }
            }
            if (style.height)
                style.height = style.height + "px";
            if (style.width)
                style.width = style.width + "px";
            return style;
        }
    }
</script>
