import AppTitle from '../../../../Components/General/AppTitle';
import MainLayout from '../../../../Layouts/MainLayout/index';
import { useState, useEffect } from 'react';
import { getAllUserWallet } from '../../../../Api/Wallets';
import { useAppSelector, useAppDispatch } from '../../../../Hooks/useRedux';
import AppButton from '../../../../Components/General/AppButton';
import { BsPlusLg } from 'react-icons/bs';
import { Space, TableProps } from 'antd';
import AppTable from '../../../../Components/General/AppTable/index';
import WalletColumns from '../../../../Components/Management/Wallets/WalletColumn';
import AppEmpty from '../../../../Components/General/AppEmpty/index';
import AppLoader from '../../../../Components/General/AppLoader';
import AppBreadcrumb from '../../../../Components/General/AppBreadcrumb';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRouteNames } from '../../../../Utils/RouteUtils';
import RouteNames from '../../../../Constants/RouteNames';
import AppMessage from '../../../../Components/General/AppMessage/index';
import AppSearchInput from '../../../../Components/General/AppSearchInput';
import { setManagementPaginationSize } from '../../../../Store/Management/ManagementSlice';

const ManagementWalletPage: React.FC = () => {
	const token = useAppSelector((state) => state.user.accessToken);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();

	const pageSize = useAppSelector(
		(state) => state.management.paginationSize?.wallet
	);

	const [wallets, setWallets] = useState<any[]>([]);
	const [walletsList, setWalletsList] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [isSearching, setIsSearching] = useState<boolean>(false);

	useEffect(() => {
		const getWallets = async () => {
			setIsLoading(true);
			const res = await getAllUserWallet(token);
			if (res.request.status === 200) {
				let resWallets = [...res.data.data];

				resWallets = resWallets.map((wallet: any) => {
					wallet['key'] = wallet._id;
					return wallet;
				});

				setWallets(resWallets);
				setWalletsList(resWallets);
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

	const handleChangeSearch = (e: any) => {
		if (e.target.value === '') {
			setWalletsList(wallets);
		}
	};

	const handleSearch = (value: string) => {
		if (value) {
			const searchQuery = value.trim();

			if (searchQuery !== '' && searchQuery !== ' ') {
				setIsSearching(true);
				const regex = new RegExp(`${searchQuery}`, 'gi');
				setWalletsList(
					wallets.filter((wallet) => wallet.name.match(regex))
				);
				setIsSearching(false);
			}
		}
	};

	const pagination: TableProps<any>['pagination'] = {
		pageSize: pageSize,
		onShowSizeChange(current, size) {
			dispatch(
				setManagementPaginationSize({
					paginationSize: { wallet: size },
				})
			);
		},
	};

	useEffect(() => {
		document.title = 'Wallet - Management - Financial Diary App';
	}, []);

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
				<>
					<div className='flex justify-start mb-3'>
						<AppSearchInput
							placeholder='Search Wallet Name'
							onSearch={handleSearch}
							onChange={handleChangeSearch}
							loading={isSearching}
						/>
					</div>
					<AppTable
						dataSource={walletsList}
						columns={WalletColumns({ navigate: navigate })}
						pagination={pagination}
					/>
				</>
			) : (
				<AppEmpty />
			)}
		</MainLayout>
	);
};

export default ManagementWalletPage;
