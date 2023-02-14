import AppButton from '../../../General/AppButton';
import AppText from '../../../General/AppText';
import { WalletColumnsType } from './interfaces/interfaces';

const WalletColumns: WalletColumnsType = ({ navigate, I18n }) => {
	return [
		{
			title: (
				<AppText
					text={I18n?.t('label.name')}
					strong
				/>
			),
			dataIndex: 'name',
			key: 'name',
			sorter: (a, b) => (a.name < b.name ? -1 : 1),
			render: (_, record) => <AppText text={record.name} />,
		},
		{
			title: (
				<AppText
					text={I18n?.t('label.action')}
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
							navigate(`/management/wallets/edit/${record._id}`, {
								state: record,
							})
						}
					>
						{I18n?.t('label.edit')}
					</AppButton>
				);
			},
		},
	];
};

export default WalletColumns;
