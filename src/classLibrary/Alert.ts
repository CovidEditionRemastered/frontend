import {QVueGlobals} from "quasar";

export class Alert {
    q: QVueGlobals;

    constructor(q: QVueGlobals) {
        this.q = q;
    }

    Ok(s: string) {
        this.q.notify({
            type: 'positive',
            icon: 'check',
            message: s,
        })
    }

    Bad(s: string) {
        this.q.notify({
            type: 'negative',
            icon: 'cross',
            message: s,
        })
    }

}
