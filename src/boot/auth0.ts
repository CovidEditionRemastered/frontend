import {boot} from "quasar/wrappers";
import Auth0Plugin from "src/plugins/Auth0Plugin";
import createAuth0Client, {Auth0ClientOptions} from "@auth0/auth0-spa-js";


export default boot(async ({Vue, router}) => {

        const domain = process.env.AUTH0_DOMAIN ?? "" as string;
        const clientId = process.env.AUTH0_CLIENT_ID ?? "" as string;
        const callback = (appState: any) => {
            router.push(
                appState && appState.targetUrl
                    ? appState.targetUrl
                    : window.location.pathname
            );
        }
        const options = {
            domain,
            client_id: clientId,
            redirect_uri: window.location.origin

        } as Auth0ClientOptions;
        const auth0client = await createAuth0Client(options);

        Vue.use(Auth0Plugin, {client: auth0client, redirectCallback: callback});


        router.beforeEach(async (to, from, next) => {

            const auth = Vue.prototype.$auth;
            await auth.Authenticate();
            const loggedIn = auth.isAuthenticated;

            if (to == from) return;
            if (!to.meta.auth) return next();
            const [pub, prv] = to.meta.auth;

            if (pub && prv) {
                return next();
            }
            if (pub && !prv) {
                if (!loggedIn) return next();
            }
            if (!pub && prv) {
                if (loggedIn) return next();
            }
            await router.push("/home");
        })


    }
);
