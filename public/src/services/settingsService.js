import http from '../utils/http';
import Translate from "../utils/translate";

class SettingsService {

    getAllSettings() {
        return http({
            method: 'GET',
            url: '/settings'
        });
    }

    save(settings) {
        return http({
            method: 'PUT',
            url: '/settings',
            data: settings
        });
    }

    update(setting) {
        return http({
            method: 'POST',
            url: '/settings',
            data: setting
        });
    }

    getByName(name) {
        return http({
            method: 'GET',
            url: '/settings/' + name
        })
    }

    addDiscount(dicounts) {
        dicounts.push({
            value: 0,
            units: ""
        });
    }

    setDisplayLanguage(langSettings) {
		let root = document.documentElement;
		Translate.useLanguage(langSettings.selected);
		for(let lang of langSettings.langs) {
			if(lang.name == langSettings.selected) {
				if(lang.dir == 'rtl') {
					root.classList.add('rtl');
				}else{
					root.classList.remove('rtl');
				}
			}
		}
	}

}

export default new SettingsService();
