import StyledContainer from './styled/StyledContainer';
import { BsPlus } from 'react-icons/bs';
import useTheme from '../../../Hooks/useTheme';
import AppText from '../../General/AppText';
import useLocale from '../../../Hooks/useLocale';

const UploadButton: React.FC = () => {
	const { color } = useTheme();
	const { I18n } = useLocale();

	return (
		<StyledContainer>
			<BsPlus
				size={24}
				color={color?.text}
			/>
			<AppText text={I18n.t('form.placeholder.profile_picture')} />
		</StyledContainer>
	);
};

export default UploadButton;
