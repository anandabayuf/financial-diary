import { AboutTheAppProps } from './interfaces/interfaces';
import AppText from '../../General/AppText/index';
import AppLogo from '../../General/AppLogo';
import { APP_NAME, APP_VERSION } from '../../../Constants/Constants';

const AboutTheAppSection: React.FC<AboutTheAppProps> = ({ I18n }) => {
	return (
		<>
			<div className='flex justify-center mb-5'>
				<AppText
					className='text-center'
					text={I18n?.t('content.about_app')}
				/>
			</div>
			<div className='flex flex-col place-items-center'>
				<div className='mb-3'>
					<AppLogo width={'200px'} />
				</div>
				<AppText
					text={APP_NAME}
					className='text-sm mb-2'
				/>
				<AppText
					isMuted
					text={`${I18n?.t('content.version')} ${APP_VERSION}`}
					className='text-xs'
				/>
			</div>
		</>
	);
};

export default AboutTheAppSection;
