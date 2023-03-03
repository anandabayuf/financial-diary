import { AppTextProps } from './interfaces/interfaces';
import useTheme from '../../../Hooks/useTheme';
import StyledText from './styled/StyledText';

const AppText: React.FC<AppTextProps> = ({ text, muted = false, ...rest }) => {
	const theme = useTheme();

	return (
		<StyledText
			textcolor={muted ? theme?.halfText : theme?.text}
			{...rest}
		>
			{text}
		</StyledText>
	);
};

export default AppText;
