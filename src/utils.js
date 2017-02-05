function toString(obj) {
    return Object.prototype.toString.call(obj);
}

export const keys = Object.keys;
export const defineProperty = Object.defineProperty;
export const defineProperties = Object.defineProperties;

export const hasOwnProperty = (obj, key) => {
    return obj.hasOwnProperty(key);
};

export const isArray = Array.isArray;

export const isPlainObject = (obj) => {
    return obj !== null && toString(obj) === '[object Object]';
};

export const nextTick = (fn) => {
    Promise.resolve().then(fn);
};

export const warn = (msg) => {
    if (process.env.NODE_ENV === 'development') {
        console.warn(msg); // eslint-disable-line no-console
    }
};