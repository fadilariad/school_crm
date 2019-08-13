const AbstractDao = require('./AbstractDao');
const Course = require('../model/Course')

class CoursesDao extends AbstractDao{
    
}

module.exports = new CoursesDao("Courses", Course);