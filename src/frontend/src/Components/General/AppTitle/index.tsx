import { AppTitleProps } from './interfaces/interfaces';
import StyledTitle from './styled/StyledTitle';
import useTheme from '../../../Hooks/useTheme';

const AppTitle: React.FC<AppTitleProps> = ({ title, level, ...rest }) => {
	const { color } = useTheme();

	return (
		<StyledTitle
			level={level}
			titlecolor={color?.title}
			{...rest}
		>
			{title}
		</StyledTitle>
	);
};

export default AppTitle;
