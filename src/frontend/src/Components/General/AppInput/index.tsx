import { AppInputProps } from './interfaces/interfaces';
import StyledInput from './styled/StyledInput';
import useTheme from '../../../Hooks/useTheme';
import StyledInputPassword from './styled/StyledInputPassword';

const AppInput: React.FC<AppInputProps> = ({ isPassword, ...rest }) => {
	const theme = useTheme();

	return isPassword ? (
		<StyledInputPassword
			{...rest}
			theme={theme}
			className='rounded-lg'
		/>
	) : (
		<StyledInput
			{...rest}
			theme={theme}
			className='rounded-lg'
		/>
	);
};

export default AppInput;
