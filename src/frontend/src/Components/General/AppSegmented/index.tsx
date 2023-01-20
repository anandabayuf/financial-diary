import { AppSegmentedProps } from './interfaces/interfaces';
import StyledSegmented from './styled/StyledSegmented';
import { AiOutlineBars, AiOutlineAppstore } from 'react-icons/ai';
import useTheme from '../../../Hooks/useTheme';
import { DataViewTypeNames } from '../../../Constants/DataViewTypeNames';

const AppSegmented: React.FC<AppSegmentedProps> = ({ value, handleChange }) => {
	const theme = useTheme();

	return (
		<StyledSegmented
			theme={theme}
			value={value}
			onChange={handleChange}
			options={[
				{
					icon: <AiOutlineBars />,
					value: DataViewTypeNames.LIST,
				},
				{
					icon: <AiOutlineAppstore />,
					value: DataViewTypeNames.GRID,
				},
			]}
		/>
	);
};

export default AppSegmented;
