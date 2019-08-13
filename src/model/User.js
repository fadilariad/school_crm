const AbstractModel = require('./AbstractModel');

class User extends AbstractModel {
    constructor() {
        super();
        this.id = "";
        this.name = "";
        this.roles = [];
    }
}

module.exports = User;