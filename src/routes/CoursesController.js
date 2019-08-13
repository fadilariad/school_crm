const service = require('../services/CoursesService')

class CoursesController {

    init(app) {
        app.get('/courses', this.list);
		app.get('/courses/count', this.count)
        app.put('/courses', this.save);
        app.get('/courses/:name/students', this.getCourseStudents);
        app.delete('/courses/:id', this.remove);
    }

    save(req, res) {
        service.save(req.body);
        res.send('OK');
    }

	count(req, res) {
		let search = req.query.search;
		service.count(search).then((count)=> {
			res.send({count});
		});
	}

    list(req, res) {
		let search = req.query.search;
		let skip = +req.query.skip;
		let limit = +req.query.limit;
        service.find(search, skip, limit).then((courses)=> {
            res.send(courses);
        });
    }

    getCourseStudents(req, res) {
        service.getStudentsOfCourse(req.params.name).then(students=> {
            res.send(students);
        })
    }

	remove(req, res) {
		service.remove(req.params.id).then(()=> {
			res.send(req.params.id);
		});
	}

}

module.exports = new CoursesController();
