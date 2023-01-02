import { FiLogOut } from 'react-icons/fi';
import { AiOutlineUser, AiOutlineSetting } from 'react-icons/ai';
import { BsSun, BsMoon } from 'react-icons/bs';
import AppText from '../../../Components/General/AppText';
import { ProfileMenuItemsType } from '../interfaces/interfaces';
import StyledSwitch from './styled/StyledSwitch';

const ProfileMenuItems: ProfileMenuItemsType = (
	textColor,
	isLight,
	handleChangeTheme,
	backgroundcolor
) => {
	return [
		{
			label: <AppText text='My Profile' />,
			key: 'my-profile',
			icon: <AiOutlineUser />,
			style: {
				color: textColor,
			},
		},
		{
			label: <AppText text='Settings' />,
			key: 'settings',
			icon: <AiOutlineSetting />,
			style: {
				color: textColor,
			},
		},
		{
			type: 'divider',
		},
		{
			label: (
				<div className='flex justify-center items-center gap-x-1'>
					<AppText text='Dark' />
					<StyledSwitch
						backgroundcolor={backgroundcolor}
						checkedChildren={
							<div className='flex justify-center items-center'>
								<BsSun color={textColor} />
							</div>
						}
						unCheckedChildren={
							<div className='flex justify-center items-center'>
								<BsMoon />
							</div>
						}
						checked={isLight}
						size='default'
						onChange={handleChangeTheme}
					/>
					<AppText text='Light' />
				</div>
			),
			key: 'theme-switcher',
			style: {
				color: textColor,
			},
		},
		{
			type: 'divider',
		},
		{
			label: 'Logout',
			key: 'logout',
			icon: <FiLogOut />,
			danger: true,
			style: {
				fontFamily: 'Comfortaa',
				fontWeight: '400',
			},
		},
	];
};

export default ProfileMenuItems;
