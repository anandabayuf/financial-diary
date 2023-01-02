import StyledEmpty from './styled/StyledEmpty';
import useTheme from '../../../Hooks/useTheme';
import { AppEmptyProps } from './interfaces/interfaces';

const AppEmpty: React.FC<AppEmptyProps> = ({ ...rest }) => {
	const theme = useTheme();

	return (
		<StyledEmpty
			{...rest}
			textcolor={theme?.text}
			imageStyle={{
				stroke: theme?.container,
			}}
		/>
	);
};

export default AppEmpty;
