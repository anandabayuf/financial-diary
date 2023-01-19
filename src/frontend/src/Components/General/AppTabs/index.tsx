import { AppTabsProps } from './interfaces/interfaces';
import StyledTabs from './styled/StyledTabs';
import useTheme from '../../../Hooks/useTheme';

const AppTabs: React.FC<AppTabsProps> = ({ items, ...rest }) => {
	const theme = useTheme();

	return (
		<StyledTabs
			theme={theme}
			type='card'
			items={items}
			{...rest}
		/>
	);
};

export default AppTabs;
