import { AppButtonProps } from './interfaces/interfaces';
import StyledButton from './styled/StyledButton';
import useTheme from '../../../Hooks/useTheme';

const AppButton: React.FC<AppButtonProps> = ({ children, ...rest }) => {
	const { color, mode } = useTheme();

	return (
		<StyledButton
			{...rest}
			backgroundcolor={color?.button}
			textcolor={color?.text}
			className='rounded-lg border-none'
			thememode={mode}
		>
			{children}
		</StyledButton>
	);
};

export default AppButton;
