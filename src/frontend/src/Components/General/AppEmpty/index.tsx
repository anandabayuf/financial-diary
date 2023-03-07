import StyledEmpty from './styled/StyledEmpty';
import useTheme from '../../../Hooks/useTheme';
import { AppEmptyProps } from './interfaces/interfaces';
import useLocale from '../../../Hooks/useLocale';

const AppEmpty: React.FC<AppEmptyProps> = ({ isInPage = false, ...rest }) => {
	const { color } = useTheme();
	const { I18n } = useLocale();

	return (
		<div className={isInPage ? 'grid place-items-center h-[60vh]' : ''}>
			<StyledEmpty
				{...rest}
				textcolor={color?.text}
				imageStyle={{
					stroke: color?.container,
				}}
				description={I18n.t('label.no_data')}
			/>
		</div>
	);
};

export default AppEmpty;
