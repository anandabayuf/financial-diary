import { AppLogoProps } from './interfaces/interfaces';
import ThemeModeNames from '../../../Constants/ThemeModeNames';
import LogoDark from '../../../Assets/Images/Logo/Logo-Full-Dark.png';
import LogoLight from '../../../Assets/Images/Logo/Logo-Full-Light.png';
import { useAppSelector } from '../../../Hooks/useRedux';

const AppLogo: React.FC<AppLogoProps> = ({ width = '128px' }) => {
	const themeMode = useAppSelector((state) => state.theme);

	return (
		<img
			width={width}
			src={themeMode === ThemeModeNames.DARK ? LogoDark : LogoLight}
			alt='logo-financial-diary'
		/>
	);
};

export default AppLogo;
