import StyledHeader from './styled/StyledHeader';
import AppButton from '../../../Components/General/AppButton/index';
import { MdOutlineMenu } from 'react-icons/md';
import { Avatar, Dropdown } from 'antd';
import { HeaderLayoutProps } from './interfaces/interfaces';
import { AiOutlineUser, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import AppText from '../../../Components/General/AppText';
import { useState } from 'react';
import StyledUsernameContainer from './styled/StyledUsernameContainer';
import StyledSpace from './styled/StyledSpace';
import React from 'react';
import ProfileMenuItems from './ProfileMenuItems';
import { useAppDispatch } from '../../../Hooks/useRedux';
import { setUserLoggedOut } from '../../../Store/User/UserSlice';
import ThemeModeNames from '../../../Constants/ThemeModeNames';
import { setDarkMode, setLightMode } from '../../../Store/Theme/ThemeSlice';
import { Link } from 'react-router-dom';
import { getRouteNames } from '../../../Utils/RouteUtils';
import RouteNames from '../../../Constants/RouteNames';
import AppLogo from '../../../Components/General/AppLogo';
import { setLocalization } from '../../../Store/Localization/LocalizationSlice';
import useTheme from '../../../Hooks/useTheme';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import { SwitchChangeEventHandler } from 'antd/es/switch';
import { LocaleType } from '../../../Store/interfaces/interfaces';

const HeaderLayout: React.FC<HeaderLayoutProps> = ({
	user,
	theme,
	handleOpenDrawer,
	I18n,
	language,
}) => {
	const dispatch = useAppDispatch();
	const { mode } = useTheme();
	const [isOpen, setIsOpen] = useState(false);
	const [isDropdownLangOpen, setIsDropdownLangOpen] = useState(false);

	const handleClickProfileMenu: MenuClickEventHandler = (e) => {
		if (e.key === 'logout') {
			dispatch(setUserLoggedOut());
		} else if (
			e.key === 'theme-switcher' ||
			e.key === 'language-switcher'
		) {
			setIsOpen(true);
		} else {
			setIsOpen(false);
		}
	};

	const handleChangeTheme: SwitchChangeEventHandler = (e) => {
		if (e) {
			dispatch(setLightMode());
		} else {
			dispatch(setDarkMode());
		}
	};

	const handleChangeLanguage: MenuClickEventHandler = (e) => {
		dispatch(setLocalization({ locale: e.key as LocaleType }));
		setIsDropdownLangOpen(false);
	};

	return (
		<StyledHeader
			backgroundcolor={theme?.bg}
			borderbottomcolor={theme?.container}
		>
			<div className='logo-container'>
				<AppButton
					icon={
						<div className='flex justify-center'>
							<MdOutlineMenu />
						</div>
					}
					type='text'
					size='large'
					onClick={handleOpenDrawer}
				/>
				<Link to={getRouteNames(RouteNames.NOTES)}>
					<AppLogo width='128px' />
				</Link>
			</div>
			<Dropdown
				menu={{
					items: ProfileMenuItems({
						textColor: theme?.text,
						isLight: mode === ThemeModeNames.LIGHT,
						handleChangeTheme: handleChangeTheme,
						I18n: I18n,
						isEnglish: language === 'en',
						handleChangeLang: handleChangeLanguage,
						backgroundcolor: theme?.container,
						isDropdownLangOpen: isDropdownLangOpen,
						setIsDropdownLangOpen: setIsDropdownLangOpen,
					}),
					style: {
						backgroundColor: theme?.button,
						width: '200px',
					},
					onClick: handleClickProfileMenu,
				}}
				trigger={['click']}
				open={isOpen}
				onOpenChange={() => setIsOpen(!isOpen)}
			>
				<AppButton
					type='primary'
					onClick={(e) => e.preventDefault()}
					style={{
						padding: '5px',
						width: 'auto',
						height: 'auto',
					}}
				>
					<StyledSpace>
						{user &&
						user.picture !== undefined &&
						user.picture !== null ? (
							<Avatar
								src={`data:image/png;base64,${user.picture.data}`}
							/>
						) : (
							<Avatar
								icon={<AiOutlineUser />}
								className='flex justify-center items-center'
							/>
						)}
						{user && (
							<StyledUsernameContainer
								className='text-ellipsis overflow-hidden ...'
								themecontainer={theme}
							>
								<AppText text={user.username} />
							</StyledUsernameContainer>
						)}
						{isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
					</StyledSpace>
				</AppButton>
			</Dropdown>
		</StyledHeader>
	);
};

export default HeaderLayout;
