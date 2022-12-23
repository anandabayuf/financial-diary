import { AppInputProps } from './interfaces/interfaces';
import StyledInput from './styled/StyledInput';

const AppInput: React.FC<AppInputProps> = ({ isPassword, ...rest }) => {
	return isPassword ? (
		<StyledInput.Password
			{...rest}
			className='rounded-lg'
		/>
	) : (
		<StyledInput
			{...rest}
			className='rounded-lg'
		/>
	);
};

export default AppInput;
