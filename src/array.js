const hijack = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

let proto = Array.prototype,
    array = Object.create(proto);
    
hijack.forEach((method) => {
    const native = proto[method];

    array[method] = function () {
        let ob = this.__ob__;

        let args = [].slice.call(arguments, 0);

        let result = native.apply(this, args),
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

export default array;