<template>
    <q-page class="swiper-component">
        <SwipeComponent :params="true" param-key="tab" :routes="routes" width="100%"/>
    </q-page>
</template>

<style lang='scss'>
.body--dark {
    .swiper-component {
        background: $dark;
    }
}

.body--light {
    .swiper-component {
        background: $pink-1;
    }
}
</style>

<script lang='ts'>
import {Component, Vue} from 'vue-property-decorator';
import SwipeComponent, {SwipeRoute} from "components/Core/SwipeComponent.vue";
import Page1 from "src/SampleComponents/Page1.vue";
import Page2 from "src/SampleComponents/Page2.vue";
import Page3 from "src/SampleComponents/Page 3.vue";
import {Tab} from "src/classLibrary/Core/StrongTyping/Tabs";

@Component({
    components: {SwipeComponent}
})
export default class SwipeSample extends Vue {

    layoutTabs: Tab[] = [
        {
            label: 'page 1',
            link: 'page1',
        },

        {
            label: 'page 2',
            link: 'page2',
        },

        {
            label: 'page 3',
            link: 'page3',
        },

        {
            label: 'page 4',
            link: 'page4',
        },

        {
            label: 'page 5',
            link: 'page5',
        },

        {
            label: 'page 6',
            link: 'page6',
        },

        {
            label: 'page 7',
            link: 'page7',
        },

        {
            label: 'page 8',
            link: 'page8',
        },

        {
            label: 'page 9',
            link: 'page9',
        }
    ]

    routes: SwipeRoute[] = [
        {
            component: Page1,
            param: "page1",
        },
        {
            component: Page2,
            param: "page2",
        },
        {
            component: Page3,
            param: "page3",
        },
        {
            component: Page2,
            param: "page4",
        },
        {
            component: Page3,
            param: "page5",
        },
        {
            component: Page2,
            param: "page6",
        },
        {
            component: Page3,
            param: "page7",
        },
        {
            component: Page2,
            param: "page8",
        },
        {
            component: Page3,
            param: "page9"
        }

    ]

}
</script>
