const AbstractModel = require('./AbstractModel');

class Student extends AbstractModel {
    constructor() {
        super();
        this.id = "";
        this.name = "";
        this.courses = [];
        this.price = 0;
        this.payments = [];
    }

    validate(obj) {
        if(!obj.name || !Array.isArray(obj.courses)) {
            throw new Error("not valid Student");
        }
    }
}

module.exports = Student;
