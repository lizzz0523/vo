import { isArray, isPlainObject } from './utils';
import Publisher from './Publisher';
import Subscriber from './Subscriber';

class Observable {
    constructor(obj) {
        this.obj = obj;

        if (isArray(obj)) {
            obj.forEach((val) => {
                observe(val);
            });
        } else if (isPlainObject(obj)) {
            Object.keys(obj).forEach((key) => {
                reactor(obj, key, obj[key]);
            });
        }
    }

    watch(key, fn) {
        if (typeof key === 'function') {
            watch(key.bind(this.obj), fn);
        } else {
            watch(this.obj, key, fn);
        }
    }
}

function reactor(obj, key, val) {
    let pub = new Publisher();

    function listen() {
        let sub = Publisher.target;

        if (sub) {
            sub.add(pub);
        }
    }

    function notify() {
        pub.notify();
    }

    function update(value) {
        observe(val = value);
    }
        
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get() {
            listen();
            return val;
        },
        set(value) {
            update(value);
            notify();
        }
    });

    observe(val);
}

export function observe(obj) {
    if (!obj.hasOwnProperty('__ob__')) {
        if (isArray(obj) || isPlainObject(obj)) {
            obj.__ob__ = new Observable(obj);
        }
    }

    return obj.__ob__;
}

export function watch(obj, key, fn) {
    let exp;

    if (typeof obj === 'function') {
        exp = obj;
        fn = key;
    } else {
        exp = function () {
            let keypath = key.split('.'),
                value = obj;

            keypath.forEach((key) => {
                value = value[key];
            });

            return value;
        };
    }

    let sub = new Subscriber(exp, fn);

    return function () {
        sub.active = false;
    };
}