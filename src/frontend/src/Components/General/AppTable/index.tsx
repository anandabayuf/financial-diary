import { AppTableProps } from './interfaces/interfaces';
import StyledTable from './styled/StyledTable';
import useTheme from '../../../Hooks/useTheme';
import AppText from '../AppText';
import { useState } from 'react';
import useLocale from '../../../Hooks/useLocale';
import AppEmpty from '../AppEmpty';

const AppTable: React.FC<AppTableProps> = ({
	showPagination = true,
	pagination,
	...rest
}) => {
	const theme = useTheme();
	const { I18n, language } = useLocale();
	const [pageSize, setPageSize] = useState<number>(5);

	return (
		<StyledTable
			{...rest}
			scroll={{ x: 800 }}
			tabletheme={theme}
			locale={{ emptyText: <AppEmpty /> }}
			showSorterTooltip={false}
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
									text={`${range[0]}-${range[1]} ${I18n.t(
										'content.pagination.of'
									)} ${total} ${I18n.t(
										'content.pagination.items'
									)}`}
								/>
							),
							locale: {
								items_per_page: ` / ${I18n.t('label.page')!}`,
								jump_to: I18n.t('content.pagination.go_to')!,
								page: language === 'id' ? '' : 'Page',
							},
							...pagination,
					  }
					: false
			}
		/>
	);
};

export default AppTable;
