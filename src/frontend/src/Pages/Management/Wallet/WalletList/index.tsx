import AppTitle from '../../../../Components/General/AppTitle';
import MainLayout from '../../../../Layouts/MainLayout/index';
import { useState, useEffect, ChangeEventHandler } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { getRouteNames } from '../../../../Utils/RouteUtils';
import RouteNames from '../../../../Constants/RouteNames';
import AppSearchInput from '../../../../Components/General/AppSearchInput';
import { setManagementPaginationSize } from '../../../../Store/Management/ManagementSlice';
import useLocale from '../../../../Hooks/useLocale';
import { errorHandling } from '../../../../Api/errorHandling';
import { APP_NAME } from '../../../../Constants/Constants';
import { appendKey } from '../../../../Utils/TableUtils';
import {
	TFetchErrorResponse,
	TWalletResponse,
} from '../../../../Api/interfaces/types';

const ManagementWalletPage: React.FC = () => {
	const token = useAppSelector((state) => state.user.accessToken);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const pageSize = useAppSelector(
		(state) => state.management.paginationSize?.wallet
	);

	const { I18n, language } = useLocale();

	const [wallets, setWallets] = useState<TWalletResponse[]>([]);
	const [walletsList, setWalletsList] = useState<TWalletResponse[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [isSearching, setIsSearching] = useState<boolean>(false);

	useEffect(() => {
		const getWallets = async () => {
			setIsLoading(true);

			if (token) {
				try {
					const res = await getAllUserWallet(token);
					let resWallets = [...res.data.data];

					setWallets(resWallets);
					setWalletsList(resWallets);
				} catch (error) {
					errorHandling(error as TFetchErrorResponse, navigate);
				}
			}

			setIsLoading(false);
		};

		getWallets(); // eslint-disable-next-line
	}, []);

	const handleClickCreate = () => {
		navigate(getRouteNames(RouteNames.CREATE_WALLETS));
	};

	const handleChangeSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
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

	const pagination: TableProps<TWalletResponse>['pagination'] = {
		pageSize: pageSize,
		onShowSizeChange(current, size) {
			dispatch(setManagementPaginationSize({ wallet: size }));
		},
	};

	useEffect(() => {
		document.title = `${I18n.t('title.management.wallet')} - ${APP_NAME}`;
	}, [language, I18n]);

	return (
		<MainLayout>
			<AppBreadcrumb />
			<div className='flex justify-between items-center mb-5'>
				<AppTitle
					title={I18n.t('management.wallet')!}
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
						{I18n.t('label.create.wallet')}
					</Space>
				</AppButton>
			</div>
			{isLoading ? (
				<AppLoader isInPage />
			) : wallets.length > 0 ? (
				<>
					<div className='flex justify-start mb-3'>
						<AppSearchInput
							placeholder={
								I18n.t('search.placeholder.management_wallet')!
							}
							onSearch={handleSearch}
							onChange={handleChangeSearch}
							loading={isSearching}
						/>
					</div>
					<AppTable
						dataSource={appendKey(walletsList)}
						columns={WalletColumns({
							navigate: navigate,
							I18n: I18n,
						})}
						pagination={pagination}
					/>
				</>
			) : (
				<AppEmpty isInPage />
			)}
		</MainLayout>
	);
};

export default ManagementWalletPage;
