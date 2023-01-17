import { ColumnsType } from 'antd/es/table';
import AppButton from '../../../General/AppButton';
import AppText from '../../../General/AppText';
import { CategoryColumnsProps } from './interfaces/interfaces';

const CategoryColumns: ({
	navigate,
}: CategoryColumnsProps) => ColumnsType<any> = ({ navigate }) => {
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
							navigate &&
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
