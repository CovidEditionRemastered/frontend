import {Err, None, Ok, Option, Result, Some} from "@hqoss/monads";
import {of, Union} from "ts-union";

interface ApiObjectError {
    code: number;
    error: object;
}

interface ApiAuthError {
    code: number;
    error: string;
}

interface ApiStringError {
    code: number;
    error: string;
}

interface ApiNullError {
    code: number;
}

interface ApiUnknownError {
    code?: number;
    error: any;
}


const ApiError = Union({
    Object: of<ApiObjectError>(),
    String: of<ApiStringError>(),
    Null: of<ApiNullError>(),
    Auth: of<ApiAuthError>(),
    Unknown: of<ApiUnknownError>(),
})

type ApiError = typeof ApiError.T;

class Api {
    constructor(host: string) {
        this.host = host;
    }

    private readonly host: string;


    private async parseError(v: Response): Promise<ApiError> {
        if (v.status == 404) {
            const a: ApiNullError = {code: 404};
            return ApiError.Null(a);
        } else if (v.status == 422) {
            const error = await v.text();
            const e: ApiStringError = {code: 422, error}
            return ApiError.String(e);
        } else if (v.status == 401 || v.status == 403) {
            const error = await v.text();
            const e: ApiAuthError = {code: v.status, error}
            return ApiError.Auth(e);
        } else if (v.status == 400) {
            const error = await v.json();
            return ApiError.Object({code: 400, error});
        } else {
            const error = await v.text();
            return ApiError.Unknown({code: v.status, error});
        }
    }

    private async parse<T>(v: Response): Promise<Result<T, ApiError>> {
        if (v.ok) {
            const o = await v.json();
            return Ok(o);
        } else {
            const err = await this.parseError(v);
            return Err(err);
        }
    }

    private async qParse(v: Response): Promise<Option<ApiError>> {
        if (v.ok) {
            return None;
        } else {
            const err = await this.parseError(v);
            return Some(err)
        }
    }

    private formRequest(method: string, body?: any | null, authToken?: string): RequestInit {
        const headers = new Headers();
        headers.set('content-type', "application/json");
        if (authToken != null) {
            headers.set('Authorization', `Bearer ${authToken}`);
        }
        let init: RequestInit = {
            method,
            headers,
        };
        if (body != null) {
            init.body = JSON.stringify(body);
        }
        return init;
    }

    public async Fetch<T>(method: string, path: string, body?: any | null, authToken?: string): Promise<Result<T, ApiError>> {

        const init = this.formRequest(method, body, authToken);
        const v = await fetch(`${this.host}/${path}`, init);
        return this.parse<T>(v);
    }

    public async QFetch(method: string, path: string, body?: any | null, authToken?: string): Promise<Option<ApiError>> {

        const init = this.formRequest(method, body, authToken);
        const v = await fetch(`${this.host}/${path}`, init);
        return this.qParse(v);
    }

    public async QGet(path: string, body?: any | null, authToken?: string): Promise<Option<ApiError>> {
        return this.QFetch("GET", path, body, authToken);
    }

    public async QDelete(path: string, body?: any | null, authToken?: string): Promise<Option<ApiError>> {
        return this.QFetch("DELETE", path, body, authToken);
    }

    public async QPut(path: string, body?: any | null, authToken?: string): Promise<Option<ApiError>> {
        return this.QFetch("PUT", path, body, authToken);
    }

    public async QPost(path: string, body?: any | null, authToken?: string): Promise<Option<ApiError>> {
        return this.QFetch("POST", path, body, authToken);
    }

    public async Get<T>(path: string, body?: any | null, authToken?: string): Promise<Result<T, ApiError>> {
        return this.Fetch<T>("GET", path, body, authToken);
    }

    public async Delete<T>(path: string, body?: any | null, authToken?: string): Promise<Result<T, ApiError>> {
        return this.Fetch<T>("DELETE", path, body, authToken);
    }

    public async Put<T>(path: string, body?: any | null, authToken?: string): Promise<Result<T, ApiError>> {
        return this.Fetch<T>("PUT", path, body, authToken);
    }

    public async Post<T>(path: string, body?: any | null, authToken?: string): Promise<Result<T, ApiError>> {
        return this.Fetch<T>("POST", path, body, authToken);
    }

}

export {Api, ApiError, ApiAuthError, ApiStringError, ApiObjectError, ApiNullError, ApiUnknownError}
