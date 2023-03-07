import { AppDatePickerProps } from './interfaces/interfaces';
import StyledDatePicker from './styled/StyledDatePicker';
import useTheme from '../../../Hooks/useTheme';
import { AiOutlineCalendar } from 'react-icons/ai';
import useLocale from '../../../Hooks/useLocale';
import 'dayjs/locale/id';
import 'dayjs/locale/en';
import localeEn from 'antd/es/date-picker/locale/en_US';
import localeId from 'antd/es/date-picker/locale/id_ID';

const AppDatePicker: React.FC<AppDatePickerProps> = ({
	picker,
	onChange,
	suffixIcon = <AiOutlineCalendar />,
	placeholder,
	value,
	disabledDate,
}) => {
	const { color } = useTheme();
	const { language } = useLocale();

	return (
		<StyledDatePicker
			theme={color}
			picker={picker}
			onChange={onChange}
			suffixIcon={suffixIcon}
			placeholder={placeholder}
			value={value}
			locale={language === 'en' ? localeEn : localeId}
			disabledDate={disabledDate}
		/>
	);
};

export default AppDatePicker;
