import { AppSelectProps } from './interfaces/interfaces';
import StyledSelect from './styled/StyledSelect';
import useTheme from '../../../Hooks/useTheme';

const AppSelect: React.FC<AppSelectProps> = ({
	options,
	value,
	placeholder,
	loading,
	handleChange,
}) => {
	const theme = useTheme();

	return (
		<StyledSelect
			theme={theme}
			options={options}
			value={value}
			placeholder={placeholder}
			loading={loading}
			onChange={handleChange}
			className='w-[100px]'
		/>
	);
};

export default AppSelect;
