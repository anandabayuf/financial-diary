import { ColumnsType } from 'antd/es/table';
import { IWallet } from '../../../Interfaces/WalletType';
import { Space } from 'antd';
import AppButton from '../../../Components/General/AppButton';
import AppText from '../../../Components/General/AppText';

const WalletColumns: ColumnsType<IWallet> = [
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
				<Space>
					<AppButton type='text'>Edit</AppButton>
					<AppButton
						type='primary'
						danger
					>
						Delete
					</AppButton>
				</Space>
			);
		},
	},
];

export default WalletColumns;
