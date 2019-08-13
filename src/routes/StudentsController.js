const service = require('../services/StudentsService')

class StudentsController {

    init(app) {
		app.get('/students/count', this.count);
        app.get('/students', this.list);
		app.get('/students/dept', this.getInDept)
        app.put('/students', this.save);
        app.delete('/students/:id', this.remove)
    }

	getInDept(req, res) {
		let search = req.query.search;
		let skip = +req.query.skip;
		let limit = +req.query.limit;
		service.getInDept(search, skip, limit).then(students => {
			res.send(students);
		});
	}

	count(req, res) {
		let search = req.query.search;
		service.count(search).then((count)=> {
			res.send({count});
		});
	}

    save(req, res) {
        service.save(req.body);
        res.send('OK');
    }

    list(req, res) {
		let search = req.query.search;
		let skip = +req.query.skip;
		let limit = +req.query.limit;
        service.find(search, skip, limit).then((students)=> {
            res.send(students);
        });
    }

    remove(req, res) {
        service.remove(req.params.id).then(()=> {
            res.send(req.params.id);
        });
    }

}

module.exports = new StudentsController();
