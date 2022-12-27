import { DrawerLayoutProps } from './interfaces/interfaces';
import StyledMenu from '../SiderLayout/styled/StyledMenu';
import MenuItems from '../SiderLayout/MenuItems';
import StyledDrawer from './styled/StyledDrawer';
import AppTitle from '../../../Components/General/AppTitle';

const DrawerLayout: React.FC<DrawerLayoutProps> = ({
	theme,
	handleClose,
	isOpen,
	menu,
}) => {
	return (
		<StyledDrawer
			title={
				<AppTitle
					title='Financial Diary'
					level={5}
				/>
			}
			placement={'left'}
			closable={false}
			onClose={handleClose}
			open={isOpen}
			backgroundcolor={theme?.bg}
			borderbottomcolor={theme?.container}
			width={250}
		>
			<StyledMenu
				mode='inline'
				selectedKeys={menu?.selectedKeys}
				openKeys={menu?.opensKeys}
				onOpenChange={menu?.onOpenChange}
				style={{ height: '100%', borderRight: 0 }}
				items={MenuItems()}
				theme={theme}
			/>
		</StyledDrawer>
	);
};

export default DrawerLayout;
