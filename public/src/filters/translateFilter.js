import Vue from 'vue';
import TranslateService from '../utils/translate'

Vue.filter('translate', function (message, ...args) {
	return TranslateService.getString(message, ...args);
});