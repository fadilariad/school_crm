const dao = require('../dao/coursesDao');
const AbstractService = require('./AbstractService');

class CoursesService extends AbstractService {

    /**
     * find all the students names registered for a course
     * @param {String} name: the course name 
     * @returns {Promise} a promise that resolves with an array of the students names of the course
     */
    async getStudentsOfCourse(name) {
		const StudentsService = require('./StudentsService');
        let students = await StudentsService.find();

        let cStudents = [];
        for(let student of students) {
            if(student.courses.indexOf(name) > -1) {
               cStudents.push(student.name);
            }
        }
        return cStudents;
    }

    /**
     * get all the courses as a map of course name to course
     * @returns {Promise} that resolves with the courses map.
     */
	async getCoursesMap() {
		let courses = await this.find();
		let coursesMap = {};
		for(let course of courses) {
			coursesMap[course.name] = course;
		}
		return coursesMap;
	}
}

module.exports = new CoursesService(dao);
