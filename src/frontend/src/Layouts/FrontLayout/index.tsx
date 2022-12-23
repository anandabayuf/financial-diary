import { FrontLayoutProps } from './interfaces/interfaces';
import StyledLayout from './styled/StyledLayout';
import StyledContent from './styled/StyledContent';
import useTheme from '../../Hooks/useTheme';

const FrontLayout: React.FC<FrontLayoutProps> = ({ children }) => {
	const theme = useTheme();

	return (
		<StyledLayout>
			<StyledContent backgroundcolor={theme?.bg}>
				{children}
			</StyledContent>
		</StyledLayout>
	);
};

export default FrontLayout;
