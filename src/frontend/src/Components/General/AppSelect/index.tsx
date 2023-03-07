import { AppSelectProps } from './interfaces/interfaces';
import StyledSelect from './styled/StyledSelect';
import useTheme from '../../../Hooks/useTheme';
import AppEmpty from '../AppEmpty/index';

const AppSelect: React.FC<AppSelectProps> = ({
	options,
	value,
	placeholder,
	loading,
	onChange,
	showSearch,
	...rest
}) => {
	const { color } = useTheme();

	return (
		<StyledSelect
			notFoundContent={
				<div className='flex justify-center'>
					<AppEmpty />
				</div>
			}
			themeselect={color}
			options={options}
			value={value}
			placeholder={placeholder}
			loading={loading}
			onChange={onChange}
			showSearch={showSearch}
			filterOption={
				showSearch
					? (input, option) =>
							(option?.label ?? '')
								.toString()
								.toLowerCase()
								.includes(input.toLowerCase())
					: undefined
			}
			{...rest}
		/>
	);
};

export default AppSelect;
