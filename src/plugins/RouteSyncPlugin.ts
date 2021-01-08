const routeParams = 'routeParams';
const routeParamUnderlying = '$routeSyncParams';
const routeQueries = 'routeQueries';
const routeQueriesUnderlying = '$routeSyncQueries';

function GenerateParams(parent: any): [any, any, boolean] {

    let empty = false;

    const targetParams = parent[routeParamUnderlying];
    const targetQueries = parent[routeQueriesUnderlying];
    const params: any = {};
    const queries: any = {};
    for (let k in targetParams) {
        if (targetParams.hasOwnProperty(k)) {
            const val = targetParams[k];
            if (!val) {
                empty = true;
                continue;
            }
            params[k] = val;
        }
    }

    for (let k in targetQueries) {
        if (targetQueries.hasOwnProperty(k)) {
            const val = targetQueries[k];
            if (!val) continue;
            queries[k] = val;
        }
    }
    return [params, queries, empty];
}


function ConvertToReactive(parent: any, key: PropertyKey, underlyingKey: PropertyKey) {
    parent[underlyingKey] = parent[key];
    delete parent[key];

    Object.defineProperty(parent, key, {
        get(): any {
            return new Proxy(parent[underlyingKey], {
                get(target: any, p: PropertyKey): any {
                    return target[p];
                },
                set(target: any, p: PropertyKey, value: any): boolean {
                    target[p] = value;
                    const [params, query, missing] = GenerateParams(parent);

                    if (!missing) {
                        const name = parent.$route.name;
                        const route = {
                            name,
                            query,
                            params
                        };
                        parent.$router.replace(route);
                    } else {
                        if (parent.onMissingParam) {
                            parent.onMissingParam();
                        }
                    }
                    return true;
                }
            })
        }
    })

}

function Update(Vue: any, parent: any, q: any, target: PropertyKey) {
    if (parent[target]) {
        for (let k in q) {
            if (q.hasOwnProperty(k)) {
                Vue.set(parent[target], k, q[k]);
            }
        }
    }

}


export default {


    install(Vue: any) {

        Vue.prototype.$routeSyncParams = {};
        Vue.prototype.$routeSyncQueries = {};

        Vue.mixin({

            created() {
                const parent = this;
                if (parent.routeParams) {
                    ConvertToReactive(parent, routeParams, routeParamUnderlying)
                }
                if (parent.routeQueries) {
                    ConvertToReactive(parent, routeQueries, routeQueriesUnderlying)
                }

            },
            watch: {
                '$route': {
                    handler: function (): void {
                        const parent = this as any;
                        if (parent.init) {
                            parent.init();
                        }
                        if (parent[routeParams])
                            Update(Vue, this, parent.$route.params, routeParamUnderlying);
                        if (parent[routeQueries])
                            Update(Vue, this, parent.$route.query, routeQueriesUnderlying);
                    },
                    immediate: true,
                    deep: true,
                },
            },
            mounted() {
                if (this[routeParams])
                    Update(Vue, this, this.$route.params, routeParamUnderlying);
                if (this[routeQueries])
                    Update(Vue, this, this.$route.query, routeQueriesUnderlying);
            }
        })
    }
};


