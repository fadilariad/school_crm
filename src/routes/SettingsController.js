const service = require('../services/SettingsService')

class SettingsController {

    init(app) {
        app.get('/settings', this.list);
        app.get('/settings/:name', this.getByName)
        app.put('/settings', this.save);
        app.post('/settings', this.update);
    }

    getByName(req, res) {
        let name = req.params.name;
        service.findByName(name).then(settings => {
            res.send(settings);
        });
    }

    save(req, res) {
        service.save(req.body);
        res.send('OK');
    }

    list(req, res) {
        service.find().then((settings)=> {
            res.send(settings);
        });
    }

    update(req, res) {
        let name = req.body.name;
        service.update(name, req.body).then(()=>{
            res.send('OK!');
        });
    }

}

module.exports = new SettingsController();
