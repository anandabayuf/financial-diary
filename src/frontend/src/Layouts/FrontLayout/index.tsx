import { FrontLayoutProps } from './interfaces/interfaces';
import StyledLayout from './styled/StyledLayout';
import StyledContent from './styled/StyledContent';
import useTheme from '../../Hooks/useTheme';
import { useAppSelector, useAppDispatch } from '../../Hooks/useRedux';
import ThemeModeNames from '../../Constants/ThemeModeNames';
import { setDarkMode, setLightMode } from '../../Store/Theme/ThemeSlice';
import AppButton from '../../Components/General/AppButton';
import { BsMoon, BsSun } from 'react-icons/bs';
import { setLocalization } from '../../Store/Localization/LocalizationSlice';
import Flag from 'react-world-flags';
import StyledSwitch from './styled/StyledSwitch';

const FrontLayout: React.FC<FrontLayoutProps> = ({ children }) => {
	const { color, mode } = useTheme();
	const dispatch = useAppDispatch();
	const language = useAppSelector((state) => state.localization.locale);

	const handleChangeTheme = () => {
		if (mode === ThemeModeNames.DARK) {
			dispatch(setLightMode());
		} else {
			dispatch(setDarkMode());
		}
	};

	const handleChangeLanguage = () => {
		if (language === 'en') {
			dispatch(setLocalization({ locale: 'id' }));
		} else {
			dispatch(setLocalization({ locale: 'en' }));
		}
	};

	return (
		<StyledLayout>
			<div className='fixed right-0 top-0 m-8 z-10 max-[320px]:m-3 max-[480px]:m-4'>
				<StyledSwitch
					switchtheme={color}
					checkedChildren={
						<div className='flex justify-center items-center'>
							<Flag
								code={'id'}
								className='rounded-sm'
							/>
						</div>
					}
					unCheckedChildren={
						<div className='flex justify-center items-center'>
							<Flag
								code={'gb'}
								className='rounded-sm'
							/>
						</div>
					}
					checked={language === 'id'}
					size='default'
					onChange={handleChangeLanguage}
				/>
			</div>
			<StyledContent backgroundcolor={color?.bg}>
				{children}
			</StyledContent>
			<div className='fixed right-0 bottom-0 m-8 z-10 max-[320px]:m-5'>
				<AppButton
					shape='circle'
					size='large'
					className='shadow-2xl'
					type='primary'
					icon={
						<div className='flex justify-center'>
							{mode === ThemeModeNames.DARK ? (
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
