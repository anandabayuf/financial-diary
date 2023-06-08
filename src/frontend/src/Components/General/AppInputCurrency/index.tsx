import { AppInputCurrencyProps } from './interfaces/interfaces';
import StyledInputCurrency from './styled/StyledInput';
import useTheme from '../../../Hooks/useTheme';

const AppInputCurrency: React.FC<AppInputCurrencyProps> = ({ ...rest }) => {
	const { color } = useTheme();

	return (
		<StyledInputCurrency
			{...rest}
			theme={color}
			formatter={(value: any) =>
				value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
			}
			parser={(value) => value!.split('.').join('')}
			max={Number.MAX_SAFE_INTEGER}
			addonBefore='Rp'
			className='rounded-lg'
		/>
	);
};

export default AppInputCurrency;
