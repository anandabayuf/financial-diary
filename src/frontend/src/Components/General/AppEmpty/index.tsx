import StyledEmpty from './styled/StyledEmpty';
import useTheme from '../../../Hooks/useTheme';

const AppEmpty: React.FC = () => {
	const theme = useTheme();

	return (
		<StyledEmpty
			textcolor={theme?.text}
			imageStyle={{
				stroke: theme?.container,
			}}
		/>
	);
};

export default AppEmpty;
