var mongodb = require('mongodb');

class AbstractDao {
    constructor(collectionName, model) {
        this.collectionName = collectionName;
        this.model = model;
    }

    setDB(db, collectionName) {
        this.db = db;
        this.collection = this.db.collection(this.collectionName);
    }

    async find(search, skip, limit) {
		let query = {};
		if(!skip) {
			skip = 0;
		}
		if(!limit) {
			limit = 0;
		}
		if(search) {
			let model = new this.model();
			let regexp = new RegExp(search);
			let $or = []
			Object.keys(model).forEach(key => $or.push({[key]: regexp}))
			query = {$or: $or};
		}
		let res = [];
		let docs = await this.collection.find(query).skip(skip).limit(limit).toArray();
		docs.forEach((doc)=> {
			return res.push(new this.model().read(doc));
		});
		return res;
    }

    async findByName(name) {
        let res = await this.collection.findOne({name:name});
        return new this.model().read(res);
    }

    async findById(id) {
        let res = await this.collection.findOne({_id: new mongodb.ObjectID(id)});
        return new this.model().read(res);
    }

    async updateById(id, updated) {
        return await this.collection.update({_id: new mongodb.ObjectID(id)}, {$set: updated});
    }

    async updateByName(name, updated) {
        return await this.collection.update({name: name}, {$set: updated});
    }

    async save(doc) {
        if(doc.id) {
            doc._id = new mongodb.ObjectID(doc.id);
            delete doc.id;
        }

        return await this.collection.save(doc);
    }

    async remove(id) {
        return await this.collection.remove({_id: new mongodb.ObjectID(id)});
    }

	async count(search) {
		let query = {};
		if(search) {
			query.name = new RegExp(search);
		}

		return await this.collection.countDocuments(query);
	}
}

module.exports = AbstractDao;
