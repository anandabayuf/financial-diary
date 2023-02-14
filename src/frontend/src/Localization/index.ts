import I18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './Language/en';
import id from './Language/id';

I18n.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		debug: process.env.NODE_ENV !== 'production',
		nsSeparator: ':::',
		keySeparator: '::',
		load: 'languageOnly',
		fallbackLng: 'en',

		resources: {
			en: {
				translation: {
					...en,
				},
			},
			id: {
				translation: {
					...id,
				},
			},
		},
	});

export default I18n;
