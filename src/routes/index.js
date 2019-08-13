const fs = require('fs');

module.exports = function(app) {
    let files = fs.readdirSync(__dirname);
    files.forEach(file => {
        if(file != 'index.js') {
            let controller = require('./' + file);
            controller.init(app)
        }
    });
}