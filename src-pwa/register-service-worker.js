import {register} from 'register-service-worker'

register(process.env.SERVICE_WORKER_FILE, {

    ready(/* registration */) {
        console.info('Service worker is active.')
    },

    registered(/* registration */) {
        console.info('Service worker has been registered.')
    },

    cached(/* registration */) {
        // console.log('Content has been cached for offline use.')
    },

    updatefound(/* registration */) {
        // console.log('New content is downloading.')
    },

    updated(/* registration */) {
        // console.log('New content is available; please refresh.')
    },

    offline() {
        console.info('No internet connection found. App is running in offline mode.')
    },

    error(/* err */) {
        console.error('Error during service worker registration:', err)
    }
})
