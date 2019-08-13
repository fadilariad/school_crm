let languages = {};

class TranslateService{

	constructor(){
		this.defaultLanguage = 'en';
		this.currentLanguage = 'en';
	}

	addLanguage(lang, strings) {
		if(!languages[lang]) {
			languages[lang] = {};
		}
		Object.assign(languages[lang], strings);
	}

	setDefaultLanguage(lang) {
		this.defaultLanguage = lang;
	}

	useLanguage(lang) {
		this.currentLanguage = lang;
	}

	getString(key) {
		let retVal = this.getRawString(key);
		if(arguments.length > 1) {
			let args = [].slice.call(arguments);
			args.shift();
			args.unshift(retVal);
			retVal = this.replaceParams(...args);
		}
		return this.processTemplate(retVal);
	}

	replaceParams(str){
		let indexParam = 0;
		if(arguments.length > 1) {
			for(let i = 1; i < arguments.length; i++) {
				indexParam = str.indexOf('%%', indexParam);
				if(indexParam > -1) {
					str = str.slice(0, indexParam) + this.getString(arguments[i]) + str.slice(indexParam + 2, str.length);
				} else {
					break;
				}
			}
		}
		return str;
	}

	processTemplate(template) {
		template = '' + template;
		if(!template) {
			return '';
		}

		return template.replace(new RegExp('%\\S+?%', 'g'), (key) => {
			let trimkey = key.slice(1, key.length - 1);
			return this.getRawString(trimkey);
		});

	}

	getRawString(key) {
		return languages[this.currentLanguage][key] || languages[this.defaultLanguage][key] || key;
	}
}

export default new TranslateService();