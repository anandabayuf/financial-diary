import { AppLogoProps } from './interfaces/interfaces';
import ThemeModeNames from '../../../Constants/ThemeModeNames';
import LogoDark from '../../../Assets/Images/Logo/Logo-Full-Dark.png';
import LogoLight from '../../../Assets/Images/Logo/Logo-Full-Light.png';
import useTheme from '../../../Hooks/useTheme';

const AppLogo: React.FC<AppLogoProps> = ({ width = '128px' }) => {
	const { mode } = useTheme();

	return (
		<img
			width={width}
			src={mode === ThemeModeNames.DARK ? LogoDark : LogoLight}
			alt='logo-financial-diary'
		/>
	);
};

export default AppLogo;
