import StyledContainer from './styled/StyledContainer';
import { BsPlus } from 'react-icons/bs';
import useTheme from '../../../Hooks/useTheme';
import AppText from '../../General/AppText';

const UploadButton: React.FC = () => {
	const theme = useTheme();

	return (
		<StyledContainer>
			<BsPlus
				size={24}
				color={theme?.text}
			/>
			<AppText text='Upload Image' />
		</StyledContainer>
	);
};

export default UploadButton;
