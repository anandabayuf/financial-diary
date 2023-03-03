import { AppCardProps } from './interfaces/interfaces';
import useTheme from '../../../Hooks/useTheme';
import StyledCard from './styled/StyledCard';

const AppCard: React.FC<AppCardProps> = ({
	children,
	isMobileShowCard = 'false',
	className,
	...rest
}) => {
	const theme = useTheme();

	return (
		<StyledCard
			className={`rounded-2xl shadow-2xl ${className}`}
			bordered={false}
			backgroundcolor={theme?.container}
			ismobileshowcard={isMobileShowCard}
			{...rest}
		>
			{children}
		</StyledCard>
	);
};

export default AppCard;
