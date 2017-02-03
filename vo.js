(function (window, undefined) {
    class Dep {
        constructor() {
            this.watchers = [];
        }

        listen(watcher) {
            if (this.watchers.indexOf(watcher) === -1) {
                this.watchers.push(watcher);
            }
        }

        notify() {
            let remains = [];

            this.watchers.forEach((watcher) => {
                if (watcher.active) {
                    watcher.run();
                    remains.push(watcher);
                }
            });

            this.watchers = remains;
        }
    }

    class Watcher {
        constructor(exp, callback) {
            this.exp = exp;
            this.active = true;
            this.callback = callback;

            this.value = this.get()
        }

        run() {
            let newValue = this.get(),
                oldValue = this.value;

            try {
                this.callback(newValue, oldValue);
            } catch (err) {
                warn(err.message);
            }

            this.value = newValue;
        }

        get() {
            Dep.target = this;

            let value = this.exp();

            Dep.target = null;

            return value;
        }
    }

    class Observable {
        constructor(obj) {
            this.obj = obj;

            if (isArray(obj)) {
                obj.forEach((val) => {
                    observe(val);
                });
            } else if (isObject(obj)) {
                Object.keys(obj).forEach((key) => {
                    reactor(obj, key, obj[key]);
                });
            }
        }

        watch(key, callback) {
            if (typeof key === 'function') {
                watch(key.bind(this.obj), callback);
            } else {
                watch(this.obj, key, callback);
            }
        }
    }

    function toString(obj) {
        return Object.prototype.toString.call(obj);
    }

    function isArray(obj) {
        return Array.isArray(obj);
    }

    function isObject(obj) {
        return obj !== null && toString(obj) === '[object Object]';
    }

    function warn(msg) {
        console.wran(msg);
    }

    function reactor(obj, key, val) {
        let dep = new Dep();
            
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            get() {
                if (Dep.target) {
                    dep.listen(Dep.target);
                }
                return val;
            },
            set(value) {
                val = value;
                dep.notify();
            }
        });

        observe(val);
    }

    function watch(obj, key, fn) {
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
            }
        }

        let watcher = new Watcher(exp, fn);

        return function () {
            watcher.active = false;
        };
    }

    function observe(obj) {
        if (!obj.hasOwnProperty('__ob__')) {
            obj.__ob__ = new Observable(obj);
        }

        return obj.__ob__;
    }

    window.vo = observe;
})(this);