let proto = Array.prototype,
    array = Object.create(proto);

let hijack = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

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

export default array;