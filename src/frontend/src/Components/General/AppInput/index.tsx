import { AppInputProps } from './interfaces/interfaces';
import StyledInput from './styled/StyledInput';
import useTheme from '../../../Hooks/useTheme';
import StyledInputPassword from './styled/StyledInputPassword';

const AppInput: React.FC<AppInputProps> = ({ isPassword, ...rest }) => {
	const { color } = useTheme();

	return isPassword ? (
		<StyledInputPassword
			{...rest}
			theme={color}
			className='rounded-lg'
		/>
	) : (
		<StyledInput
			{...rest}
			theme={color}
			className='rounded-lg'
		/>
	);
};

export default AppInput;
