import { AppTabsProps } from './interfaces/interfaces';
import StyledTabs from './styled/StyledTabs';
import useTheme from '../../../Hooks/useTheme';

const AppTabs: React.FC<AppTabsProps> = ({ items, ...rest }) => {
	const { color } = useTheme();

	return (
		<StyledTabs
			theme={color}
			type='card'
			items={items}
			{...rest}
		/>
	);
};

export default AppTabs;
