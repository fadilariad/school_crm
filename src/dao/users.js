const AbstractDao = require('./AbstractDao');
const User = require('../model/User');

class UsersDao extends AbstractDao{
    
    findAll(){
        this.collection.find().toArray((err, users)=>{
            users.forEach((user)=> {
                console.log(user);
            })
        })
    }
}

module.exports = new UsersDao('Users', User);