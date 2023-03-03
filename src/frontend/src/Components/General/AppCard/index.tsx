import { AppCardProps } from './interfaces/interfaces';
import useTheme from '../../../Hooks/useTheme';
import StyledCard from './styled/StyledCard';

const AppCard: React.FC<AppCardProps> = ({
	children,
	isMobileShowCard = 'false',
	className,
	...rest
}) => {
	const { color } = useTheme();

	return (
		<StyledCard
			className={`rounded-2xl shadow-2xl ${className}`}
			bordered={false}
			backgroundcolor={color?.container}
			ismobileshowcard={isMobileShowCard}
			{...rest}
		>
			{children}
		</StyledCard>
	);
};

export default AppCard;
