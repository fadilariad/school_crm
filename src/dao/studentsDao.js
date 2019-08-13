const AbstractDao = require('./AbstractDao');
const Student = require('../model/Student')

class StudentsDao extends AbstractDao{
    
}

module.exports = new StudentsDao("Students", Student);