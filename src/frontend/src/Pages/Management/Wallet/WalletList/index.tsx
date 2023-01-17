import AppTitle from '../../../../Components/General/AppTitle';
import MainLayout from '../../../../Layouts/MainLayout/index';
import { useState, useEffect } from 'react';
import { getAllUserWallet } from '../../../../Api/Wallets';
import { useAppSelector } from '../../../../Hooks/useRedux';
import AppButton from '../../../../Components/General/AppButton';
import { BsPlusLg } from 'react-icons/bs';
import { Space } from 'antd';
import AppTable from '../../../../Components/General/AppTable/index';
import WalletColumns from '../../../../Components/Management/Wallets/WalletColumn';
import AppEmpty from '../../../../Components/General/AppEmpty/index';
import AppLoader from '../../../../Components/General/AppLoader';
import AppBreadcrumb from '../../../../Components/General/AppBreadcrumb';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRouteNames } from '../../../../Utils/RouteUtils';
import RouteNames from '../../../../Constants/RouteNames';
import AppMessage from '../../../../Components/General/AppMessage/index';

const ManagementWalletPage: React.FC = () => {
	const token = useAppSelector((state) => state.user.accessToken);
	const navigate = useNavigate();
	const location = useLocation();

	const [wallets, setWallets] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const getWallets = async () => {
			setIsLoading(true);
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

			setIsLoading(false);
		};

		getWallets(); // eslint-disable-next-line
	}, []);

	const handleClickCreate = () => {
		navigate(getRouteNames(RouteNames.CREATE_WALLETS));
	};

	useEffect(() => {
		const stateReceiveAction = () => {
			if (location.state) {
				AppMessage({
					content: location.state.message,
					type: 'success',
				});
				window.history.replaceState({}, document.title);
			}
		};

		stateReceiveAction(); // eslint-disable-next-line
	}, [location.state]);

	return (
		<MainLayout>
			<AppBreadcrumb />
			<div className='flex justify-between items-center mb-5'>
				<AppTitle
					title='Management Wallets'
					level={5}
				/>
				<AppButton
					type='primary'
					onClick={handleClickCreate}
				>
					<Space>
						<div className='flex justify-center'>
							<BsPlusLg />
						</div>
						Create Wallet
					</Space>
				</AppButton>
			</div>
			{isLoading ? (
				<AppLoader />
			) : wallets.length > 0 ? (
				<AppTable
					dataSource={wallets}
					columns={WalletColumns({ navigate: navigate })}
				/>
			) : (
				<AppEmpty />
			)}
		</MainLayout>
	);
};

export default ManagementWalletPage;
