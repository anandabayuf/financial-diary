import { FrontLayoutProps } from './interfaces/interfaces';
import StyledLayout from './styled/StyledLayout';
import StyledContent from './styled/StyledContent';
import useTheme from '../../Hooks/useTheme';
import { FloatButton } from 'antd';
import { useAppSelector, useAppDispatch } from '../../Hooks/useRedux';
import ThemeModeNames from '../../Constants/ThemeModeNames';
import { setDarkMode, setLightMode } from '../../Store/Theme/ThemeSlice';

const FrontLayout: React.FC<FrontLayoutProps> = ({ children }) => {
	const theme = useTheme();
	const themeMode = useAppSelector((state) => state.theme);
	const dispatch = useAppDispatch();

	const handleChangeTheme = () => {
		if (themeMode === ThemeModeNames.DARK) {
			dispatch(setLightMode());
		} else {
			dispatch(setDarkMode());
		}
	};

	return (
		<StyledLayout>
			<StyledContent backgroundcolor={theme?.bg}>
				{children}
			</StyledContent>
			<FloatButton onClick={handleChangeTheme} />
		</StyledLayout>
	);
};

export default FrontLayout;
