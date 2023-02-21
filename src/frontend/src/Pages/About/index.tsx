import AppBreadcrumb from '../../Components/General/AppBreadcrumb';
import AppTitle from '../../Components/General/AppTitle';
import MainLayout from '../../Layouts/MainLayout/index';
import useLocale from '../../Hooks/useLocale';
import { useEffect } from 'react';
import { APP_NAME } from '../../Constants/Constants';
import OurTeamSection from '../../Components/About/OurTeamSection/index';
import AboutTheAppSection from '../../Components/About/AboutTheAppSection';

const AboutPage: React.FC = () => {
	const { I18n, language } = useLocale();

	useEffect(() => {
		document.title = `${I18n.t('about_us')} - ${APP_NAME}`;
	}, [language, I18n]);

	return (
		<MainLayout>
			<AppBreadcrumb />
			<AppTitle
				level={5}
				title={I18n.t('about_us')!}
			/>
			<OurTeamSection I18n={I18n} />
			<AboutTheAppSection I18n={I18n} />
		</MainLayout>
	);
};

export default AboutPage;
