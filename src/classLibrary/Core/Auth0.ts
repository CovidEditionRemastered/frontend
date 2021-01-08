import {Auth0Client} from "@auth0/auth0-spa-js";
import jwt_decode from 'jwt-decode';

export interface Auth0User {
    email: string;
    email_verified: string;
    sub: string;
    picture: string;
    nickname: string;
    name: string;
}

class Auth0 {
    constructor(auth0Client: Auth0Client, redirectCallback: Function) {
        this.auth0Client = auth0Client;
        this.redirectCallback = redirectCallback;
    }

    loading: boolean = false;
    private _authenticated: boolean = false;

    get isAuthenticated(): boolean {
        return this._authenticated;
    };

    set isAuthenticated(a: boolean) {
        const prev = this._authenticated;
        this._authenticated = a;
        if (prev != a && a) {
            async function setUser(p: Auth0) {
                p.user = await p.auth0Client.getUser();
            }

            setUser(this).then();
        }

    }

    user?: Auth0User = undefined;
    auth0Client: Auth0Client;
    redirectCallback: Function;
    coreToken?: string;
    analyticsToken?: string;

    async Logout() {
        await this.auth0Client.logout({
            returnTo: window.location.origin
        })
    }

    get CoreToken(): Promise<string> {
        async function lambda(p: Auth0) {
            p.coreToken = await p.DeferredToken(p.coreToken, process.env.AUTH0_AUD);
            return p.coreToken!;
        }

        return lambda(this);
    }

    async DeferredToken(token?: string, audience?: string) {
        if (token) {
            const jwt = jwt_decode(token) as any;
            if (jwt.exp && Date.now() < jwt.exp * 1000) {
                return new Promise<string>((r) => {
                    r(token);
                });
            }
            return this.getNewToken(audience ?? "")
        }
        return this.getNewToken(audience ?? "")
    }

    async getNewToken(audience: string) {
        return await this.auth0Client.getTokenSilently({
            audience,
        });
    }

    async HandleRedirectCallback() {
        this.loading = true;
        try {
            const r = await this.auth0Client.handleRedirectCallback();
            this.user = await this.auth0Client.getUser();
            this.isAuthenticated = true;
            return r;
        } catch (e) {
            console.log(e);
        } finally {
            this.loading = false;
        }
    }

    async Authenticate() {
        this.isAuthenticated = await this.auth0Client.isAuthenticated();
    }

    async Login() {
        await this.auth0Client.loginWithRedirect();
    }

}

export {Auth0}
