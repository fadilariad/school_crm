const AbstractModel = require('./AbstractModel');

class Settings extends AbstractModel {
    constructor() {
        super();
        this.name = "";
        this.value = "";
        
    }
    
    validate(obj) {
    }
}

module.exports = Settings;