import { AppFormItemProps } from './interfaces/interfaces';
import StyledFormItem from './styled/StyledFormItem';
import useTheme from '../../../Hooks/useTheme';

const AppFormItem: React.FC<AppFormItemProps> = ({ children, ...rest }) => {
	const { color } = useTheme();

	return (
		<StyledFormItem
			formitemtheme={color}
			requiredMark={'optional'}
			{...rest}
		>
			{children}
		</StyledFormItem>
	);
};

export default AppFormItem;
