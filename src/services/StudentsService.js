const dao = require('../dao/studentsDao');
const AbstractService = require('./AbstractService');
const SettingsService = require('./SettingsService');

class StudentsService extends AbstractService {

	async getInDept(name, skip, limit) {
		const CoursesService = require('./CoursesService');
		let inDept = [];
		let coursesDiscount = await SettingsService.findByName('coursesDiscount');
		let students = await this.find(name);
		let coursesMap = await CoursesService.getCoursesMap();

		for(let student of students) {
			let dept = this.calcStudentDept(student, coursesMap, coursesDiscount);
			if(dept > 0) {
				inDept.push(student);
			}
		}
		let size = inDept.length;
		let page = inDept.splice(skip, limit);
		return {
			students: page,
			count: size
		};
	}

	calcStudentDept(student, courses, coursesDiscount) {
		let numOfCourses = student.courses.length;
		let discount = 0;
		if(numOfCourses > 1) {
			discount = +coursesDiscount.value[numOfCourses -2].value;
		}
		let price = student.courses.reduce((sum, courseName) => +sum + +courses[courseName].price, 0) - discount;
		let payments = student.payments.reduce((sum, payment) => +sum + +payment.value, 0);

		return price - payments;
	}




}

module.exports = new StudentsService(dao);
