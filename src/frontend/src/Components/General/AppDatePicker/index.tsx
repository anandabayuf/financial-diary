import { AppDatePickerProps } from './interfaces/interfaces';
import StyledDatePicker from './styled/StyledDatePicker';
import useTheme from '../../../Hooks/useTheme';
import { AiOutlineCalendar } from 'react-icons/ai';

const AppDatePicker: React.FC<AppDatePickerProps> = ({
	picker,
	onChange,
	suffixIcon = <AiOutlineCalendar />,
	placeholder,
}) => {
	const theme = useTheme();

	return (
		<StyledDatePicker
			theme={theme}
			picker={picker}
			onChange={onChange}
			suffixIcon={suffixIcon}
			placeholder={placeholder}
		/>
	);
};

export default AppDatePicker;
