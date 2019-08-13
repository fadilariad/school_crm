const fs = require('fs');

module.exports = function(db) {
    let files = fs.readdirSync(__dirname);
    files.forEach(file => {
        if(file != 'index.js' && file != 'AbstractDao.js') {
            let dao = require('./' + file);
            dao.setDB(db);
        }
    });
}