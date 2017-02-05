(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("vo", [], factory);
	else if(typeof exports === 'object')
		exports["vo"] = factory();
	else
		root["vo"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Publisher = function () {
    function Publisher() {
        _classCallCheck(this, Publisher);

        this.subs = [];
    }

    _createClass(Publisher, [{
        key: "bind",
        value: function bind(sub) {
            var subs = this.subs;

            if (subs.indexOf(sub) === -1) {
                subs.push(sub);
            }
        }
    }, {
        key: "unbind",
        value: function unbind(sub) {
            var subs = this.subs,
                index = subs.indexOf(sub);

            if (index !== -1) {
                subs.splice(index, 1);
            }
        }
    }, {
        key: "notify",
        value: function notify() {
            var subs = this.subs,
                temp = [];

            subs.forEach(function (sub) {
                if (sub.active) {
                    sub.run();
                    temp.push(sub);
                }
            });

            this.subs = temp;
        }
    }]);

    return Publisher;
}();

exports.default = Publisher;


var klass = Publisher,
    stack = [];

klass.target = null;

klass.pushStack = function (target) {
    stack.push(target);
    klass.target = target;
};

klass.popStack = function () {
    klass.target = stack.pop();
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function toString(obj) {
    return Object.prototype.toString.call(obj);
}

var isArray = exports.isArray = Array.isArray;

var isPlainObject = exports.isPlainObject = function isPlainObject(obj) {
    return obj !== null && toString(obj) === '[object Object]';
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(1);

var _Publisher = __webpack_require__(0);

var _Publisher2 = _interopRequireDefault(_Publisher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gid = 1;

var Subscriber = function () {
    function Subscriber(exp, fn) {
        _classCallCheck(this, Subscriber);

        this.id = gid++;
        this.fn = fn;
        this.exp = exp;
        this.pubs = [];
        this.token = 0;
        this.active = true;

        this.value = this.get_();
    }

    _createClass(Subscriber, [{
        key: 'warn_',
        value: function warn_() {
            var text = this.fn.toString();

            text = text.replace(/^[^{]+{\s*/, '');
            text = text.replace(/\s*}$/, '');

            return text;
        }
    }, {
        key: 'suid_',
        value: function suid_() {
            return this.id + '-' + this.token;
        }
    }, {
        key: 'reset_',
        value: function reset_() {
            this.token++;
        }
    }, {
        key: 'clear_',
        value: function clear_() {
            var _this = this;

            var suid = this.suid_(),
                pubs = this.pubs;

            this.pubs = pubs.filter(function (pub) {
                var active = pub.suid === suid;

                if (!active) {
                    pub.unbind(_this);
                }

                return active;
            });
        }
    }, {
        key: 'add',
        value: function add(pub) {
            var suid = this.suid_(),
                pubs = this.pubs;

            if (pubs.indexOf(pub) === -1) {
                pubs.push(pub);
                pub.bind(this);
            }

            pub.suid = suid;
        }
    }, {
        key: 'get_',
        value: function get_() {
            _Publisher2.default.pushStack(this);

            this.reset_();

            var value = this.exp();

            this.clear_();

            _Publisher2.default.popStack();

            return value;
        }
    }, {
        key: 'run',
        value: function run() {
            var newValue = this.get_(),
                oldValue = this.value;

            try {
                this.fn(newValue, oldValue);
            } catch (error) {
                var exp = this.text_(),
                    msg = error.message || 'unknown';

                (0, _utils.warn)('error in subscriber "' + exp + '": ' + msg);

                throw error;
            }

            this.value = newValue;
        }
    }]);

    return Subscriber;
}();

exports.default = Subscriber;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var hijack = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

var proto = Array.prototype,
    array = Object.create(proto);

hijack.forEach(function (method) {
    var native = proto[method];

    array[method] = function () {
        var ob = this.__ob__;

        var args = [].slice.call(arguments, 0);

        var result = native.apply(this, args),
            insert = [];

        switch (method) {
            case 'push':
            case 'unshift':
                insert = args;
                break;
            case 'splice':
                insert = args.slice(2);
                break;
        }

        ob.walk(insert);
        ob.pub.notify();

        return result;
    };
});

array.set = function (index, value) {
    return this.splice(index, 1, value);
};

array.del = function (index) {
    return this.splice(index, 1);
};

exports.default = array;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.watch = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.observe = observe;

var _utils = __webpack_require__(1);

var _Publisher = __webpack_require__(0);

var _Publisher2 = _interopRequireDefault(_Publisher);

var _Subscriber = __webpack_require__(2);

var _Subscriber2 = _interopRequireDefault(_Subscriber);

var _array = __webpack_require__(3);

var _array2 = _interopRequireDefault(_array);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observable = function () {
    function Observable(obj) {
        _classCallCheck(this, Observable);

        this.obj = obj;
        this.pub = null;

        if ((0, _utils.isArray)(obj)) {
            // 劫持array的核心方法
            obj.__proto__ = _array2.default;
        }

        this.walk(obj);
    }

    _createClass(Observable, [{
        key: 'walk',
        value: function walk(obj) {
            if ((0, _utils.isArray)(obj)) {
                obj.forEach(function (val) {
                    observe(val);
                });
            } else if ((0, _utils.isPlainObject)(obj)) {
                Object.keys(obj).forEach(function (key) {
                    reactor(obj, key, obj[key]);
                });
            }
        }
    }, {
        key: 'watch',
        value: function watch(key, fn, sync) {
            var opts = (typeof sync === 'undefined' ? 'undefined' : _typeof(sync)) === 'object' ? sync : { sync: sync };

            if (typeof key === 'function') {
                _watch(key.bind(this.obj), fn, opts);
            } else {
                _watch(this.obj, key, fn, opts);
            }
        }
    }]);

    return Observable;
}();

function reactor(obj, key, val) {
    var pub = new _Publisher2.default(),
        ob = observe(val);

    if (ob) {
        ob.pub = pub;
    }

    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get: function get() {
            listen();
            return val;
        },
        set: function set(value) {
            update(value);
            notify();
        }
    });

    function listen() {
        var sub = _Publisher2.default.target;

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
}

function observe(obj) {
    if (!obj.hasOwnProperty('__ob__')) {
        if ((0, _utils.isArray)(obj) || (0, _utils.isPlainObject)(obj)) {
            obj.__ob__ = new Observable(obj);
        }
    }

    return obj.__ob__;
}

function _watch(obj, key, fn, opts) {
    var exp = void 0;

    if (typeof obj === 'function') {
        opts = fn;
        exp = obj;
        fn = key;
    } else {
        exp = function exp() {
            var keypath = key.split('.'),
                value = obj;

            keypath.forEach(function (key) {
                value = value[key];
            });

            return value;
        };
    }

    var sub = new _Subscriber2.default(exp, fn, opts);

    if (opts.sync) {
        fn.call(sub, sub.value);
    }

    return function () {
        sub.active = false;
    };
}
exports.watch = _watch;

/***/ })
/******/ ]);
});