import React from 'react';
import { SiderLayoutProps } from './interfaces/interfaces';
import MenuItems from './MenuItems';
import StyledSider from './styled/StyledSider';
import StyledMenu from './styled/StyledMenu';

const SiderLayout: React.FC<SiderLayoutProps> = ({ theme, menu }) => {
	return (
		<StyledSider
			backgroundcolor={theme?.bg}
			borderrightcolor={theme?.container}
		>
			<StyledMenu
				mode='inline'
				// defaultSelectedKeys={['1']}
				// defaultOpenKeys={['sub1']}
				selectedKeys={menu?.selectedKeys}
				openKeys={menu?.opensKeys}
				onOpenChange={menu?.onOpenChange}
				style={{ height: '100%', borderRight: 0 }}
				items={MenuItems()}
				theme={theme}
			/>
		</StyledSider>
	);
};

export default SiderLayout;
