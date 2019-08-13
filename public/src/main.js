// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './filters/translateFilter'
import Translate from './utils/translate'
import en from './locales/en.json'
import ar from './locales/ar.json'
import he from './locales/he.json'
import vSelect from 'vue-select'
import SettingsService from './services/settingsService'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faMinusCircle, faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Payments from './components/payments'
import Quote from './components/quote'

library.add(faMinusCircle, faEdit, faPlusCircle);
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('v-select', vSelect)
Vue.component('payments', Payments);

Translate.addLanguage('en', en);
Translate.addLanguage('ar', ar);
Translate.addLanguage('he', he);

Vue.config.productionTip = false

SettingsService.getByName('DisplayLanguage')
	.then(res => {
		let langSettings = res.data.value;
		SettingsService.setDisplayLanguage(langSettings);
	})
	.finally(()=> {

		/* eslint-disable no-new */
		new Vue({
		  el: '#app',
		  router,
		  components: { App },
		  template: '<App/>'
		})

	});
