const {configure} = require('quasar/wrappers');
// const TerserPlugin = require('terser-webpack-plugin');

module.exports = configure(function (ctx) {
    return {
        supportTS: true,
        boot: [
            'init.ts',
            'assets.ts',
            'auth0.ts',
        ],
        css: [
            'app.scss'
        ],
        extras: [
            // 'ionicons-v4',
            // 'mdi-v5',
            // 'fontawesome-v5',
            // 'eva-icons',
            // 'themify',
            // 'line-awesome',
            // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

            'roboto-font', // optional, you are not bound to it
            'material-icons', // optional, you are not bound to it
        ],
        build: {
            vueRouterMode: 'history', // available values: 'hash', 'history'
            env: {
                AUTH0_AUD: process.env.AUTH0_AUD,
                AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
                AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
                API: process.env.API,
            },

            extendWebpack(cfg) {
                // if (!ctx.dev) {
                //     cfg.optimization.minimizer = [
                //         new TerserPlugin({
                //             terserOptions: {
                //                 compress: {
                //                     drop_console: true,
                //                     unsafe: false,
                //                 },
                //                 output: {comments: false},
                //                 toplevel: false
                //             }
                //         })
                //     ]
                // }
            },
        },

        devServer: {
            https: true,
            host: 'soap',
            port: 8091,
            open: true
        },

        // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
        framework: {
            iconSet: 'material-icons', // Quasar icon set
            lang: 'en-us', // Quasar language pack
            config: {},
            importStrategy: 'auto',
            plugins: [
                'Notify'
            ]
        },
        // https://quasar.dev/options/animations
        animations: 'all',
        ssr: {
            pwa: true
        },
        pwa: {
            workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
            manifest: {
                name: `Soapy`,
                short_name: `Soapy`,
                description: `WebApp to control your smart home`,
                display: 'standalone',
                orientation: 'portrait',
                // background_color: '#ffffff',
                theme_color: '#027be3',
                icons: [
                    {
                        src: 'icons/icon-128x128.png',
                        sizes: '128x128',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/icon-256x256.png',
                        sizes: '256x256',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/icon-384x384.png',
                        sizes: '384x384',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        },

        // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
        cordova: {
            // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
        },

        // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
        capacitor: {
            hideSplashscreen: true
        },

        // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
        electron: {
            bundler: 'packager', // 'packager' or 'builder'

            packager: {
                // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

                // OS X / Mac App Store
                // appBundleId: '',
                // appCategoryType: '',
                // osxSign: '',
                // protocol: 'myapp://path',

                // Windows only
                // win32metadata: { ... }
            },

            builder: {
                // https://www.electron.build/configuration/configuration

                appId: 'soapy'
            },

            // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
            nodeIntegration: true,

            extendWebpack(/* cfg */) {
                // do something with Electron main process Webpack cfg
                // chainWebpack also available besides this extendWebpack
            }
        }
    }
});
