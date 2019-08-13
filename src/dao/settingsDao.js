const AbstractDao = require('./AbstractDao');
const Settings = require('../model/Settings')

class SettingsDao extends AbstractDao{
    
}

module.exports = new SettingsDao("Settings", Settings);