<template>
    <q-layout view="hHh LpR fFf" style="height: 100vh">

        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="left = !left"/>

                <q-toolbar-title>
                    <q-avatar>
                        <img :src="logo" alt="logo">
                    </q-avatar>
                    {{ Store.StoreValue.title }}
                </q-toolbar-title>

                <!--                <q-btn dense flat round icon="menu" @click="right = !right"/>-->
            </q-toolbar>
            <q-tabs v-show="ShowTabs" align="left">
                <q-route-tab v-for="t in Tabs" :key="t.label" :to="t.link" :icon="t.icon" :label="t.label"
                             outside-arrows
                             mobile-arrows/>
            </q-tabs>
        </q-header>

        <q-drawer v-model="left" side="left" bordered class="column justify-between">
            <Profile class="absolute-top"/>
            <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
                <NavLink v-for="(l, index) in links"
                         :key="index" :title="l.name" :icon="l.icon" :link="l.link" :caption="l.caption"/>
                <q-space/>
                <div class="fixed-bottom">

                    <q-toggle v-model="dark"/>
                    <NavLink title="Logout" caption="Exit" @click.native="$auth.Logout"/>
                </div>
            </q-scroll-area>


        </q-drawer>

        <q-drawer v-model="right" side="right" bordered>
            <!-- drawer content -->
        </q-drawer>

        <q-page-container>
            <!--            <keep-alive>-->
            <router-view v-transition="transition" id="main-page"/>
            <!--            </keep-alive>-->
        </q-page-container>

    </q-layout>
</template>
<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import NavLink from "components/Core/NavLink.vue";
import {Route} from 'vue-router'
import {Link} from "src/classLibrary/Core/StrongTyping/Link";
import {Tab} from "src/classLibrary/Core/StrongTyping/Tabs";
import Profile from "components/Core/Profile.vue";
import logo from "../assets/quasar-logo-full.svg";

const ENTER_DEF = 'fadeInRight';
const LEAVE_DEF = 'fadeInLeft';


@Component({
    components: {Profile, NavLink}
})
export default class MainLayout extends Vue {

    get logo() {
        return logo;
    }

    created() {
        this.$router.beforeEach((to: Route, from: Route, next) => {
            this.transition.enter = ENTER_DEF;
            this.transition.leave = LEAVE_DEF;
            if (to?.meta?.transition?.enter) {
                this.transition.enter = to.meta.transition.enter
            }
            if (from?.meta?.transition?.leave) {
                this.transition.leave = to.meta.transition.leave
            }
            next();
        });
    }


    left = false;
    right = false;

    transition: { enter: string, leave: string } = {
        enter: ENTER_DEF,
        leave: LEAVE_DEF,
    }


    get Tabs(): Tab[] {
        return this.Store.StoreValue.tabs;
    }

    get ShowTabs() {
        return this.Store.StoreValue.tabs.length > 0;
    }

    links: Link[] = [
        {
            name: 'Home',
            caption: 'Home Page',
            link: '/',
            icon: 'icofont-home'
        },
    ]
}
</script>
