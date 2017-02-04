function toString(obj) {
    return Object.prototype.toString.call(obj);
}

export const isArray = Array.isArray;

export const isPlainObject = (obj) => {
    return obj !== null && toString(obj) === '[object Object]';
};