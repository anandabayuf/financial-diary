import { AppButtonProps } from './interfaces/interfaces';
import StyledButton from './styled/StyledButton';
import useTheme from '../../../Hooks/useTheme';

const AppButton: React.FC<AppButtonProps> = ({ children, ...rest }) => {
	const theme = useTheme();

	return (
		<StyledButton
			{...rest}
			backgroundcolor={theme?.button}
			textcolor={theme?.text}
			className='rounded-lg border-none'
		>
			{children}
		</StyledButton>
	);
};

export default AppButton;
