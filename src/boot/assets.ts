import Vue from "vue";
import photo1 from "../assets/images/photo1.jpg";
import photo2 from "../assets/images/photo2.jpg";
import icecream from "../assets/animations/icecream.json";
import noTissue from "../assets/animations/tissue.json";
import chemicalExplosion from "../assets/animations/chemical.json";
import alienInvasion from "../assets/animations/cow.json";
import catGlass from "../assets/animations/cat.json";
import dogFindingLostObject from "../assets/animations/dogSmell.json";
import coffeeSplit from "../assets/animations/coffee.json";
import lochness from "../assets/animations/lochness.json";
import dogEatsNewspaper from "../assets/animations/dogNewsPaper.json";
import lostInSpace from "../assets/animations/astronaout.json";
import laptopBroken from "../assets/animations/laptop.json";
import doggyCantSwim from "../assets/animations/dogSwimming.json";
import missingPiece from "../assets/animations/puzzle.json";
import welcome from "../assets/animations/smart.json";

const animations = {
    errors: {
        lochness,
        icecream,
        noTissue,
        chemicalExplosion,
        alienInvasion,
        catGlass,
        dogFindingLostObject,
        missingPiece,
        coffeeSplit,
        dogEatsNewspaper,
        lostInSpace,
        laptopBroken,
        doggyCantSwim
    },
    welcome
}

export const goodOnes = [1, 3, 4, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 21, 23, 24, 25, 28, 29, 31, 32, 34, 36, 38];

const md: { [s: string]: string } = {};
for (let i = 0; i < goodOnes.length; i++) {
    md[`${goodOnes[i]}index`] = require(`../assets/md-background/${goodOnes[i]}.jpg`);
}

const images = {
    photo1,
    photo2,
    md,
}

declare module 'vue/types/vue' {

    interface Vue {
        $animations: {
            errors: {
                lochness: object,
                icecream: object,
                noTissue: object,
                chemicalExplosion: object,
                alienInvasion: object,
                catGlass: object,
                dogFindingLostObject: object,
                missingPiece: object,
                coffeeSplit: object,
                dogEatsNewspaper: object,
                lostInSpace: object,
                laptopBroken: object,
                doggyCantSwim: object,
            },
            welcome: object,
        }

        $images: { photo1: string, photo2: string, md: { [s: string]: string } }
    }
}

Vue.prototype.$animations = animations;
Vue.prototype.$images = images;

