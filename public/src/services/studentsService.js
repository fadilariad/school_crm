import FieldsService from './fieldsService'
import http from '../utils/http'
import CouesesService from './coursesService'
import SettingsService from './settingsService'

class StudentsService {

    getFields(student) {

        student = student || {
            id: '',
            name: '',
            price: 0,
            courses: [],
			payments: []
        }

        let priceField = FieldsService.getField('price', 'price', 'number', student.price, true);
		let coursesField = FieldsService.getField('courses', 'courses', 'array', [], false, []);

        let fields = [
            FieldsService.getField('id', 'id', 'text', student.id, true),
            FieldsService.getField('name', 'name', 'text', student.name),
			coursesField,
            priceField,
			FieldsService.getField('payments', 'payments', 'payments', student.payments)
        ];


        Promise.all([CouesesService.getCourses(), SettingsService.getByName('coursesDiscount')]).then(values => {
            let courses = values[0].data;
            let coursesDiscount = values[1].data.value

            let curr = [];

            if(student.courses.length && !student.courses[0].name) {
                let studentCourses = [];
                let coursesMap = {};

                for(let course of courses) {
                    coursesMap[course.name] = course;
                }

                for(let i in student.courses) {
                   curr.push(coursesMap[student.courses[i]]);
                }

            }

			coursesField.value.push(...curr);
			coursesField.values.push(...courses);

			FieldsService.setFieldOnChange(coursesField, (value) => {
                let numOfCourses = coursesField.value.length;
                let discount = 0;
                if(numOfCourses > 1) {
                    discount = +coursesDiscount[numOfCourses - 2].value;
                }
                priceField.value = value.reduce((accumulator, currentValue) => +accumulator + +currentValue.price, 0) - discount;
            });
        });

        return fields;
    }

    getStudents(search, skip, limit) {
        return http({
            method: 'GET',
            url: '/students',
			queryParams: {
				search, skip, limit
			}
        });
    }

	getInDept(search, skip, limit) {
		return http({
			method: 'GET',
			url: '/students/dept',
			queryParams: {
				search, skip, limit
			}
		});
	}

    save(student) {
        let courses = [];
        for(let course of student.courses) {
            courses.push(course.name || course);
        }

        student.courses = courses;
        return http({
            method: 'PUT',
            url: '/students',
            data: student
        });
    }

    remove(student) {
        return http({
            method: 'DELETE',
            url: '/students/' + student.id
        });
    }

	count(search) {
		return http({
			method: 'GET',
			url: '/students/count',
			queryParams: {
				search
			}
		});
	}

}

export default new StudentsService();
