const AbstractModel = require('./AbstractModel');

class Course extends AbstractModel {
    constructor() {
        super();
        this.id = "";
        this.name = "";
        this.price = 0;
    }

    validate(obj) {
        if(!obj.name) {
			throw new Error("aaaa");
		}
    }
}

module.exports = Course;
