import Publisher from './Publisher';
import { warn } from './utils';

let gid = 1;

export default class Subscriber {
    constructor(exp, fn) {
        this.id = gid++;
        this.fn = fn;
        this.exp = exp;
        this.pubs = [];
        this.token = 0;
        this.active = true;

        this.value = this.get_();
    }

    warn_() {
        let text = this.fn.toString();

        text = text.replace(/^[^{]+{\s*/, '');
        text = text.replace(/\s*}$/, '');

        return text;
    }

    suid_() {
        return this.id + '-' + this.token;
    }

    reset_() {
        this.token++;
    }

    clear_() {
        let suid = this.suid_(),
            pubs = this.pubs;

        this.pubs = pubs.filter((pub) => {
            let active = pub.suid === suid;

            if (!active) {
                pub.unbind(this);
            }

            return active;
        });
    }

    add(pub) {
        let suid = this.suid_(),
            pubs = this.pubs;

        if (pubs.indexOf(pub) === -1) {
            pubs.push(pub);
            pub.bind(this);
        }

        pub.suid = suid;
    }

    get_() {
        Publisher.pushStack(this);

        this.reset_();
        
        let value = this.exp();

        this.clear_();

        Publisher.popStack();

        return value;
    }

    run() {
        let newValue = this.get_(),
            oldValue = this.value;

        try {
            this.fn(newValue, oldValue);
        } catch (error) {
            let exp = this.text_(),
                msg = error.message || 'unknown';

            warn('error in subscriber "' + exp + '": ' + msg);

            throw error;
        }

        this.value = newValue;
    }
}