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
import { useAppDispatch, useAppSelector } from '../../../Hooks/useRedux';
import { setUserLoggedOut } from '../../../Store/User/UserSlice';
import ThemeModeNames from '../../../Constants/ThemeModeNames';
import { setDarkMode, setLightMode } from '../../../Store/Theme/ThemeSlice';
import { Link } from 'react-router-dom';
import { getRouteNames } from '../../../Utils/RouteUtils';
import RouteNames from '../../../Constants/RouteNames';
import AppLogo from '../../../Components/General/AppLogo';

const HeaderLayout: React.FC<HeaderLayoutProps> = ({
	user,
	theme,
	handleOpenDrawer,
}) => {
	const themeMode = useAppSelector((state) => state.theme);
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useAppDispatch();

	const handleClickProfileMenu = (e: any) => {
		if (e.key === 'logout') {
			dispatch(setUserLoggedOut());
		} else if (e.key !== 'theme-switcher') {
			setIsOpen(false);
		}
	};

	const handleChangeTheme = (e: any) => {
		if (e) {
			dispatch(setLightMode());
		} else {
			dispatch(setDarkMode());
		}
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
					items: ProfileMenuItems(
						theme?.text,
						themeMode === ThemeModeNames.LIGHT,
						handleChangeTheme,
						theme?.container
					),
					style: {
						backgroundColor: theme?.button,
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
							<StyledUsernameContainer className='text-ellipsis overflow-hidden ...'>
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
