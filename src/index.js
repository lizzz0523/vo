import Publisher from './Publisher';
import Subscriber from './Subscriber';
import arrayProto from './array';
import { 
    keys, isArray, isPlainObject, nextTick,
    hasOwnProperty, defineProperty, defineProperties
} from './utils';


class Observable {
    constructor(obj) {
        if (isArray(obj)) {
            // 劫持array的核心方法
            obj.__proto__ = arrayProto;
        }

        this.obj = this.walk(obj);
        this.pub = null;
    }

    walk(obj) {
        if (isArray(obj)) {
            obj.forEach((val) => {
                observe(val);
            });
        } else if (isPlainObject(obj)) {
            obj = reactor(obj);
        }

        return obj;
    }

    watch(key, fn, sync) {
        let opts = typeof sync === 'object' ? sync : { sync };

        if (typeof key === 'function') {
            watch(key.bind(this), fn, opts);
        } else {
            watch(this, key, fn, opts);
        }

        return this;
    }
}

function reactor(obj) {
    let props = {};

    keys(obj).forEach((key) => {
        let val = obj[key];

        let pub = new Publisher(),
            ob = observe(val);

        if (ob) {
            ob.pub = pub;
        }

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
            val = value;
            ob = observe(val);

            if (ob) {
                ob.pub = pub;
            }
        }
            
        props[key] = {
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
        };
    });

    return defineProperties(obj, props);
}

function observe(obj) {
    if (!hasOwnProperty(obj, '__ob__')) {
        if (isArray(obj) || isPlainObject(obj)) {
            defineProperty(obj, '__ob__', {
                value: new Observable(obj),
                writable: true,
                configurable: true
            });
        }
    }

    return obj.__ob__;
}

export function proxy(obj) {
    let ob = observe(obj);

    keys(obj).forEach((key) => {
        defineProperty(ob, key, {
            configurable: true,
            enumerable: true,
            get() {
                return ob.obj[key];
            },
            set(val) {
                ob.obj[key] = val;
            }
        });
    });

    return ob;
}

export function watch(obj, key, fn, opts) {
    let exp;

    if (typeof obj === 'function') {
        opts = fn;
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

    let sub = new Subscriber(exp, fn, opts);

    if (opts.sync) {
        nextTick(() => {
            fn.call(sub, sub.value);
        });
    }

    return function () {
        sub.active = false;
    };
}