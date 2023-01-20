import { AppTableProps } from './interfaces/interfaces';
import StyledTable from './styled/StyledTable';
import useTheme from '../../../Hooks/useTheme';
import AppText from '../AppText';

const AppTable: React.FC<AppTableProps> = ({ ...rest }) => {
	const theme = useTheme();

	return (
		<StyledTable
			{...rest}
			tabletheme={theme}
			pagination={{
				pageSize: 5,
				pageSizeOptions: [5, 10, 15, 20, 25, 50, 100],
				showSizeChanger: true,
				showPrevNextJumpers: true,
				showQuickJumper: true,
				showTotal: (total, range) => (
					<AppText
						text={`${range[0]}-${range[1]} of ${total} items`}
					/>
				),
			}}
		/>
	);
};

export default AppTable;