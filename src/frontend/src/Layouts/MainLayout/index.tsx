import { MainLayoutProps } from './interfaces/interfaces';
import StyledContent from './styled/StyledContent';
import StyledLayout from './styled/StyledLayout';
import useTheme from '../../Hooks/useTheme';
import React from 'react';
import HeaderLayout from './HeaderLayout/index';
import SiderLayout from './SiderLayout';
import { Layout, MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Hooks/useRedux';
import { setOpenKeys, setSelectedKeys } from '../../Store/Menu/MenuSlice';
import { rootSubmenuKeys } from './SiderLayout/MenuItems';
import DrawerLayout from './DrawerLayout';

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	const theme = useTheme();
	const user = useAppSelector((state) => state.user.data);
	const location = useLocation();
	const dispatch = useAppDispatch();
	const { openKeys, selectedKeys } = useAppSelector((state) => state.menu);
	const [drawerState, setDrawerState] = useState({
		isOpen: false,
	});

	useEffect(() => {
		const setSelectedKeysByLocation = () => {
			let pathNameArr = location.pathname.split('/');
			pathNameArr = pathNameArr.filter(Boolean);

			dispatch(setOpenKeys(pathNameArr));
			dispatch(setSelectedKeys(pathNameArr));
		};

		setSelectedKeysByLocation(); // eslint-disable-next-line
	}, []);

	const onOpenSubMenuChange: MenuProps['onOpenChange'] = (keys) => {
		const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
		if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
			dispatch(setOpenKeys(keys));
		} else {
			dispatch(setOpenKeys(latestOpenKey ? [latestOpenKey] : []));
		}
	};

	const handleCloseDrawer = () => {
		setDrawerState({
			...drawerState,
			isOpen: false,
		});
	};

	const handleOpenDrawer = () => {
		setDrawerState({
			...drawerState,
			isOpen: true,
		});
	};

	return (
		<StyledLayout>
			<HeaderLayout
				user={user}
				theme={theme}
				handleOpenDrawer={handleOpenDrawer}
			/>
			<Layout hasSider>
				<SiderLayout
					theme={theme}
					menu={{
						selectedKeys: selectedKeys,
						opensKeys: openKeys,
						onOpenChange: onOpenSubMenuChange,
					}}
				/>
				<StyledContent backgroundcolor={theme?.bg}>
					{children}
				</StyledContent>
			</Layout>
			<DrawerLayout
				theme={theme}
				handleClose={handleCloseDrawer}
				isOpen={drawerState.isOpen}
				menu={{
					selectedKeys: selectedKeys,
					opensKeys: openKeys,
					onOpenChange: onOpenSubMenuChange,
				}}
			/>
		</StyledLayout>
	);
};

export default MainLayout;
