import React from 'react';
import { SiderLayoutProps } from './interfaces/interfaces';
import MenuItems from './MenuItems';
import StyledSider from './styled/StyledSider';
import StyledMenu from './styled/StyledMenu';
import { useAppSelector } from '../../../Hooks/useRedux';

const SiderLayout: React.FC<SiderLayoutProps> = ({ theme, menu, I18n }) => {
	const themeMode = useAppSelector((state) => state.theme);

	return (
		<StyledSider
			backgroundcolor={theme?.bg}
			borderrightcolor={theme?.container}
		>
			<StyledMenu
				mode='inline'
				selectedKeys={menu?.selectedKeys}
				openKeys={menu?.opensKeys}
				onOpenChange={menu?.onOpenChange}
				style={{ height: '100%', borderRight: 0 }}
				items={MenuItems({ I18n: I18n })}
				theme={theme}
				thememode={themeMode}
			/>
		</StyledSider>
	);
};

export default SiderLayout;
