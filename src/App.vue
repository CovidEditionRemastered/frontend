<template>
    <div id="q-app">
        <MainLayout v-if="RenderLayout"/>
        <EmptyLayout v-else/>
    </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import MainLayout from "layouts/MainLayout.vue";
import EmptyLayout from "layouts/EmptyLayout.vue";


@Component({
    components: {EmptyLayout, MainLayout}
})
export default class App extends Vue {

    get RenderLayout() {
        return this.LoggedIn && this.$route.name !== 'home';
    }


    async created() {

        const darkMode = localStorage.getItem('dark-mode') ?? 'false';
        const dm = JSON.parse(darkMode);
        this.$q.dark.set(dm);

        this.$q.iconMapFn = (iconName) => {
            if (iconName.startsWith('icofont-')) {
                return {
                    cls: iconName
                }
            }
        }

        if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
            // handle the redirect and retrieve tokens
            const {appState} = await this.$auth.HandleRedirectCallback() as any;

            // Notify subscribers that the redirect callback has happened, passing the appState
            // (useful for retrieving any pre-authentication state)
            this.$auth.redirectCallback(appState);
        }
    }
}
</script>
