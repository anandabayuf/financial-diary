import { AppCardProps } from './interfaces/interfaces';
import useTheme from '../../../Hooks/useTheme';
import StyledCard from './styled/StyledCard';

const AppCard: React.FC<AppCardProps> = ({ children }) => {
	const theme = useTheme();

	return (
		<StyledCard
			className={`rounded-2xl shadow-2xl`}
			bordered={false}
			backgroundcolor={theme?.container}
		>
			{children}
		</StyledCard>
	);
};

export default AppCard;
