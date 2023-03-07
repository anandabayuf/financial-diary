import { Avatar } from 'antd';
import AppText from '../../General/AppText/index';
import { OurTeamSectionProps } from './interfaces/interfaces';
import FotoBayu from '../../../Assets/Images/About/foto-bayu.jpg';
import FotoAley from '../../../Assets/Images/About/foto-aley.jpg';

const OurTeamSection: React.FC<OurTeamSectionProps> = ({ I18n }) => {
	return (
		<div className='mb-10'>
			<div className='flex justify-center mb-5'>
				<AppText
					className='text-center'
					text={I18n?.t('content.our_team')}
				/>
			</div>
			<div className='flex justify-center gap-x-20 max-[425px]:gap-x-7 max-[320px]:gap-x-10'>
				<div className='flex flex-col justify-center items-center'>
					<Avatar
						src={FotoBayu}
						size={'large'}
						className='shadow-lg w-[150px] h-[150px] mb-3 max-[320px]:w-[100px] max-[320px]:h-[100px] max-[320px]:mb-1'
						alt='foto-bayu'
					/>
					<AppText
						text='Bayu'
						className='text-center text-sm'
					/>
					<AppText
						muted
						text={I18n?.t('content.developer')}
						className='text-xs text-center'
					/>
				</div>
				<div className='flex flex-col justify-center items-center'>
					<Avatar
						src={FotoAley}
						size={'large'}
						className='shadow-lg w-[150px] h-[150px] mb-3 max-[320px]:w-[100px] max-[320px]:h-[100px] max-[320px]:mb-1'
						alt='foto-aley'
					/>
					<AppText
						text='Aley'
						className='text-center text-sm'
					/>
					<AppText
						muted
						text={`${I18n?.t('content.owner')}/${I18n?.t(
							'content.user'
						)}`}
						className='text-xs text-center'
					/>
				</div>
			</div>
		</div>
	);
};

export default OurTeamSection;
