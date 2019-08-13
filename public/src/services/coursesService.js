import FieldsService from './fieldsService'
import http from '../utils/http'

class CoursesService {

    getCourses(search, skip, limit) {
        return http({
            method: 'GET',
            url: '/courses',
			queryParams: {
				search, skip, limit
			}
        });
    }

	count(search) {
		return http({
			method: 'GET',
			url: '/courses/count',
			queryParams: {
				search
			}
		});
	}

    save(course) {
        return http({
            method: 'PUT',
            url: '/courses',
            data: course
        });
    }

    getCourseStudents(course) {
        return http({
            method: 'GET',
            url: '/courses/' + course.name + '/students'
        });
    }

    getFields(course) {
        course = course || {
            id: '',
            name: '',
            price: 0
        }

        return [
            new FieldsService.getField('id', 'id', 'text', course.id, true),
            new FieldsService.getField('name', 'name', 'text', course.name),
            new FieldsService.getField('price', 'price', 'number', course.price)
        ];
    }
}

export default new CoursesService();
