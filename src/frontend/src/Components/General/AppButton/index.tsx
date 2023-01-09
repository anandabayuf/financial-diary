import { AppButtonProps } from './interfaces/interfaces';
import StyledButton from './styled/StyledButton';
import useTheme from '../../../Hooks/useTheme';
import { useAppSelector } from '../../../Hooks/useRedux';

const AppButton: React.FC<AppButtonProps> = ({ children, ...rest }) => {
	const theme = useTheme();
	const themeMode = useAppSelector((state) => state.theme);

	return (
		<StyledButton
			{...rest}
			backgroundcolor={theme?.button}
			textcolor={theme?.text}
			className='rounded-lg border-none'
			thememode={themeMode}
		>
			{children}
		</StyledButton>
	);
};

export default AppButton;
