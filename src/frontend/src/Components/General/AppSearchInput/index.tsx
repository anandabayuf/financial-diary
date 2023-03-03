import { AppSearchInputProps } from './interfaces/interfaces';
import StyledSearchInput from './styled/StyledSearchInput';
import useTheme from '../../../Hooks/useTheme';

const AppSearchInput: React.FC<AppSearchInputProps> = ({
	placeholder,
	onSearch,
	...rest
}) => {
	const { color } = useTheme();

	return (
		<StyledSearchInput
			placeholder={placeholder}
			allowClear
			onSearch={onSearch}
			theme={color}
			enterButton
			{...rest}
		/>
	);
};

export default AppSearchInput;
