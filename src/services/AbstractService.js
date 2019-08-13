class AbstractService {

    constructor(dao) {
        this.dao = dao;
    }

    save(model) {
        return this.dao.save(model);
    }

    find(name, skip, limit) {
        return this.dao.find(name, skip, limit);
    }

	findByName(name) {
		return this.dao.findByName(name);
	}

	count(search) {
		return this.dao.count(search);
	}

    update(name, model) {
        return this.dao.updateByName(name, model);
    }

    remove(id) {
        return this.dao.remove(id);
    }
}

module.exports = AbstractService;
