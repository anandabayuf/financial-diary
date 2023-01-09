import { ColumnsType } from 'antd/es/table';
import AppButton from '../../../../Components/General/AppButton';
import AppText from '../../../../Components/General/AppText';

const CategoryColumns: (navigate?: any) => ColumnsType<any> = (navigate) => {
	return [
		{
			title: (
				<AppText
					text='Name'
					strong
				/>
			),
			dataIndex: 'name',
			key: 'name',
			render: (_, record) => <AppText text={record.name} />,
		},
		{
			title: (
				<AppText
					text='Action'
					strong
				/>
			),
			key: 'action',
			align: 'center',
			render: (_, record) => {
				return (
					<AppButton
						type='text'
						onClick={() =>
							navigate(
								`/management/category/edit/${record._id}`,
								{
									state: record,
								}
							)
						}
					>
						Edit
					</AppButton>
				);
			},
		},
	];
};

export default CategoryColumns;
