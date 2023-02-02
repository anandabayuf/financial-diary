import { AppTableProps } from './interfaces/interfaces';
import StyledTable from './styled/StyledTable';
import useTheme from '../../../Hooks/useTheme';
import AppText from '../AppText';
import { useState } from 'react';

const AppTable: React.FC<AppTableProps> = ({
	showPagination = true,
	pagination,
	...rest
}) => {
	const theme = useTheme();
	const [pageSize, setPageSize] = useState<number>(5);

	return (
		<StyledTable
			{...rest}
			scroll={{ x: 800 }}
			tabletheme={theme}
			pagination={
				showPagination
					? {
							pageSize: pageSize,
							pageSizeOptions: [5, 10, 15, 20, 25, 50, 100],
							showSizeChanger: true,
							showPrevNextJumpers: true,
							showQuickJumper: true,
							onShowSizeChange(current, size) {
								setPageSize(size);
							},
							showTotal: (total, range) => (
								<AppText
									text={`${range[0]}-${range[1]} of ${total} items`}
								/>
							),
							...pagination,
					  }
					: false
			}
		/>
	);
};

export default AppTable;
