export default class Publisher {
    constructor() {
        this.subs = [];
    }

    bind(sub) {
        let subs = this.subs;

        if (subs.indexOf(sub) === -1) {
            subs.push(sub);
        }
    }

    unbind(sub) {
        let subs = this.subs,
            index = subs.indexOf(sub);

        if (index !== -1) {
            subs.splice(index, 1);
        }
    }

    notify() {
        let subs = this.subs,
            temp = [];

        subs.forEach((sub) => {
            if (sub.active) {
                sub.run();
                temp.push(sub);
            }
        });

        this.subs = temp;
    }
}

let klass = Publisher,
    stack = [];

klass.target = null;

klass.pushStack = function(target) {
    stack.push(target);
    klass.target = target;
};

klass.popStack = function() {
    klass.target = stack.pop();
};