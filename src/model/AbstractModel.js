class AbstractModel {

    read(obj) {
        this.validate(obj);
        let keys = Object.keys(this);
        
        for(let key of keys) {
            if(key == "id") {
                this.id = obj._id || obj.id;
            } else {
                this[key] = obj[key];   
            }
        }
        
        return this;
    }
    
    validate(obj) {
        
    }
}

module.exports = AbstractModel;