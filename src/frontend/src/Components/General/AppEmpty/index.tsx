import StyledEmpty from './styled/StyledEmpty';
import useTheme from '../../../Hooks/useTheme';
import { AppEmptyProps } from './interfaces/interfaces';
import useLocale from '../../../Hooks/useLocale';

const AppEmpty: React.FC<AppEmptyProps> = ({ ...rest }) => {
	const theme = useTheme();
	const { I18n } = useLocale();

	return (
		<StyledEmpty
			{...rest}
			textcolor={theme?.text}
			imageStyle={{
				stroke: theme?.container,
			}}
			description={I18n.t('label.no_data')}
		/>
	);
};

export default AppEmpty;
