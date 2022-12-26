import { FrontLayoutProps } from './interfaces/interfaces';
import StyledLayout from './styled/StyledLayout';
import StyledContent from './styled/StyledContent';
import useTheme from '../../Hooks/useTheme';
import { FloatButton } from 'antd';
import { useAppSelector, useAppDispatch } from '../../Hooks/useRedux';
import ThemeModeNames from '../../Constants/ThemeModeNames';
import { setDarkMode, setLightMode } from '../../Store/Theme/ThemeSlice';
import AppButton from '../../Components/General/AppButton';
import { BsMoon, BsSun } from 'react-icons/bs';

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
			<div className='fixed right-0 bottom-0 m-8'>
				<AppButton
					shape='circle'
					size='large'
					className='shadow-2xl'
					type='primary'
					icon={
						<div className='flex justify-center'>
							{themeMode === ThemeModeNames.DARK ? (
								<BsSun />
							) : (
								<BsMoon />
							)}
						</div>
					}
					onClick={handleChangeTheme}
				/>
			</div>
		</StyledLayout>
	);
};

export default FrontLayout;
