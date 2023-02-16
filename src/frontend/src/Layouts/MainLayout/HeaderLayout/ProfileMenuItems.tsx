import { FiLogOut } from 'react-icons/fi';
import {
	AiOutlineUser,
	// AiOutlineSetting
} from 'react-icons/ai';
import { BsSun, BsMoon } from 'react-icons/bs';
import AppText from '../../../Components/General/AppText';
import { ProfileMenuItemsType } from '../interfaces/interfaces';
import { Link } from 'react-router-dom';
import { getRouteNames } from '../../../Utils/RouteUtils';
import RouteNames from '../../../Constants/RouteNames';
import AppSwitch from '../../../Components/General/AppSwitch/index';
import Flag from 'react-world-flags';
import { Dropdown, Space } from 'antd';
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';

const ProfileMenuItems: ProfileMenuItemsType = ({
	textColor,
	backgroundcolor,
	I18n,
	isLight,
	isEnglish,
	isDropdownLangOpen,
	setIsDropdownLangOpen,
	handleChangeTheme,
	handleChangeLang,
}) => {
	return [
		{
			label: (
				<Link to={getRouteNames(RouteNames.MY_PROFILE)}>
					<AppText text={I18n?.t('menu.my_profile')} />
				</Link>
			),
			key: 'my-profile',
			icon: <AiOutlineUser />,
			style: {
				color: textColor,
			},
		},
		// {
		// 	label: <AppText text='Settings' />,
		// 	key: 'settings',
		// 	icon: <AiOutlineSetting />,
		// 	style: {
		// 		color: textColor,
		// 	},
		// },
		{
			type: 'divider',
		},
		{
			label: (
				<div className='flex justify-center items-center gap-x-1'>
					<AppText text={I18n?.t('menu.theme_switcher.dark')} />
					<AppSwitch
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
					<AppText text={I18n?.t('menu.theme_switcher.light')} />
				</div>
			),
			key: 'theme-switcher',
			style: {
				color: textColor,
			},
		},
		{
			label: (
				<Dropdown
					menu={{
						items: [
							{
								label: (
									<Space>
										<Flag
											code={'gb'}
											className='rounded-sm'
											width={24}
										/>
										<AppText text='English' />
									</Space>
								),
								key: 'en',
							},
							{
								label: (
									<Space>
										<Flag
											code={'id'}
											className='rounded-sm'
											width={24}
										/>
										<AppText text='Indonesia' />
									</Space>
								),
								key: 'id',
							},
						],
						style: {
							backgroundColor: backgroundcolor,
						},
						onClick: handleChangeLang,
						selectable: true,
						selectedKeys: isEnglish ? ['en'] : ['id'],
					}}
					trigger={['click']}
					open={isDropdownLangOpen}
					onOpenChange={() =>
						setIsDropdownLangOpen &&
						setIsDropdownLangOpen(!isDropdownLangOpen)
					}
					overlayClassName='language-switcher'
				>
					<div className='flex justify-between items-center'>
						<Space>
							{isEnglish ? (
								<Flag
									code={'gb'}
									className='rounded-sm'
									width={24}
								/>
							) : (
								<Flag
									code={'id'}
									className='rounded-sm'
									width={24}
								/>
							)}
							<AppText
								text={isEnglish ? 'English' : 'Indonesia'}
							/>
						</Space>
						{isDropdownLangOpen ? (
							<AiFillCaretUp color={textColor} />
						) : (
							<AiFillCaretDown color={textColor} />
						)}
					</div>
				</Dropdown>
			),
			key: 'language-switcher',
		},
		{
			type: 'divider',
		},
		{
			label: I18n?.t('menu.logout'),
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
