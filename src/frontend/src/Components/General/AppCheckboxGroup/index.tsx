import { AppCheckboxGroupProps } from './interfaces/interfaces';
import StyledCheckboxGroup from './styled/StyledCheckboxGroup';
import useTheme from '../../../Hooks/useTheme';

const AppCheckboxGroup: React.FC<AppCheckboxGroupProps> = ({
	options,
	onChange,
	...rest
}) => {
	const { color } = useTheme();

	return (
		<StyledCheckboxGroup
			className='grid grid-cols-1'
			onChange={onChange}
			options={options}
			checkboxtheme={color}
			{...rest}
		/>
	);
};

export default AppCheckboxGroup;
