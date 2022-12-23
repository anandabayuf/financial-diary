import { AppFormItemProps } from './interfaces/interfaces';
import StyledFormItem from './styled/StyledFormItem';
import useTheme from '../../../Hooks/useTheme';

const AppFormItem: React.FC<AppFormItemProps> = ({ children, ...rest }) => {
	const theme = useTheme();

	return (
		<StyledFormItem
			textcolor={theme?.text}
			requiredMark={'optional'}
			{...rest}
		>
			{children}
		</StyledFormItem>
	);
};

export default AppFormItem;
