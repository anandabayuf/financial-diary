import AppTitle from '../../../Components/General/AppTitle';
import MainLayout from '../../../Layouts/MainLayout/index';
import { useState, useEffect } from 'react';
import { getAllUserWallet } from '../../../Api/Wallets';
import { useAppSelector } from '../../../Hooks/useRedux';
import AppButton from '../../../Components/General/AppButton';
import { BsPlusLg } from 'react-icons/bs';
import { Space } from 'antd';
import AppTable from '../../../Components/General/AppTable/index';
import { IWallet } from '../../../Interfaces/WalletType';
import WalletColumns from './WalletColumns';
import AppEmpty from '../../../Components/General/AppEmpty/index';

const ManagementWalletPage: React.FC = () => {
	const [wallets, setWallets] = useState<IWallet[]>([]);
	const token = useAppSelector((state) => state.user.accessToken);

	useEffect(() => {
		const getWallets = async () => {
			const res = await getAllUserWallet(token);

			if (res.request.status === 200) {
				const resWallets = [...res.data.data];
				setWallets(
					resWallets.map((wallet: any) => {
						wallet['key'] = wallet._id;
						return wallet;
					})
				);
			}
		};

		getWallets(); // eslint-disable-next-line
	}, []);

	return (
		<MainLayout>
			<div className='flex justify-between items-center mb-5'>
				<AppTitle
					title='Management Wallets'
					level={5}
				/>
				<AppButton type='primary'>
					<Space>
						<div className='flex justify-center'>
							<BsPlusLg />
						</div>
						Create Wallet
					</Space>
				</AppButton>
			</div>
			{wallets.length > 0 ? (
				<AppTable
					dataSource={wallets}
					columns={WalletColumns}
				/>
			) : (
				<AppEmpty />
			)}
		</MainLayout>
	);
};

export default ManagementWalletPage;
