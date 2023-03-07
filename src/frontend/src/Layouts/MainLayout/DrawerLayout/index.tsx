import { DrawerLayoutProps } from './interfaces/interfaces';
import StyledMenu from '../SiderLayout/styled/StyledMenu';
import MenuItems from '../SiderLayout/MenuItems';
import StyledDrawer from './styled/StyledDrawer';
import AppLogo from '../../../Components/General/AppLogo';

const DrawerLayout: React.FC<DrawerLayoutProps> = ({
	theme,
	handleClose,
	isOpen,
	menu,
	I18n,
}) => {
	return (
		<StyledDrawer
			title={<AppLogo width='128px' />}
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
				items={MenuItems({ I18n: I18n })}
				theme={theme}
			/>
		</StyledDrawer>
	);
};

export default DrawerLayout;
