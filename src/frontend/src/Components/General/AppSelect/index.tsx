import { AppSelectProps } from './interfaces/interfaces';
import StyledSelect from './styled/StyledSelect';
import useTheme from '../../../Hooks/useTheme';

const AppSelect: React.FC<AppSelectProps> = ({
	options,
	value,
	placeholder,
	loading,
	onChange,
	...rest
}) => {
	const theme = useTheme();

	return (
		<StyledSelect
			themeselect={theme}
			options={options}
			value={value}
			placeholder={placeholder}
			loading={loading}
			onChange={onChange}
			{...rest}
		/>
	);
};

export default AppSelect;
