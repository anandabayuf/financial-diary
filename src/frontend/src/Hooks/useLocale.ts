import { useMemo } from 'react';
import { useAppSelector } from './useRedux';
import I18n from '../Localization/index';

const useLocale = () => {
	const language = useAppSelector((state) => state.localization.locale);

	useMemo(() => {
		const changeLanguage = () => {
			if (language === 'en') {
				I18n.changeLanguage('en');
			} else if (language === 'id') {
				I18n.changeLanguage('id');
			}
		};

		changeLanguage();
	}, [language]);

	return {
		I18n,
		language,
	};
};

export default useLocale;
