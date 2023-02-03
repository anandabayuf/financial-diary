import AppTitle from '../../../../Components/General/AppTitle';
import MainLayout from '../../../../Layouts/MainLayout/index';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../Hooks/useRedux';
import AppButton from '../../../../Components/General/AppButton';
import { BsPlusLg } from 'react-icons/bs';
import { Space, TableProps } from 'antd';
import AppTable from '../../../../Components/General/AppTable/index';
import WalletColumns from '../../../../Components/Management/Category/CategoryColumn';
import AppEmpty from '../../../../Components/General/AppEmpty/index';
import AppLoader from '../../../../Components/General/AppLoader';
import AppBreadcrumb from '../../../../Components/General/AppBreadcrumb';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRouteNames } from '../../../../Utils/RouteUtils';
import RouteNames from '../../../../Constants/RouteNames';
import { getAllUserCategory } from '../../../../Api/Category';
import AppMessage from '../../../../Components/General/AppMessage/index';
import AppSearchInput from '../../../../Components/General/AppSearchInput/index';
import { setManagementPaginationSize } from '../../../../Store/Management/ManagementSlice';

const ManagementCategoryPage: React.FC = () => {
	const token = useAppSelector((state) => state.user.accessToken);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();

	const pageSize = useAppSelector(
		(state) => state.management.paginationSize?.category
	);

	const [categories, setCategories] = useState<any[]>([]);
	const [categoriesList, setCategoriesList] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [isSearching, setIsSearching] = useState<boolean>(false);

	useEffect(() => {
		const getCategory = async () => {
			setIsLoading(true);
			const res = await getAllUserCategory(token);

			if (res.request.status === 200) {
				let resCategories = [...res.data.data];

				resCategories = resCategories.map((category: any) => {
					category['key'] = category._id;
					return category;
				});

				setCategories(resCategories);
				setCategoriesList(resCategories);
			}

			setIsLoading(false);
		};

		getCategory(); // eslint-disable-next-line
	}, []);

	const handleClickCreate = () => {
		navigate(getRouteNames(RouteNames.CREATE_CATEGORY));
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
			setCategoriesList(categories);
		}
	};

	const handleSearch = (value: string) => {
		if (value) {
			const searchQuery = value.trim();

			if (searchQuery !== '' && searchQuery !== ' ') {
				setIsSearching(true);
				const regex = new RegExp(`${searchQuery}`, 'gi');
				setCategoriesList(
					categories.filter((category) => category.name.match(regex))
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
					paginationSize: { category: size },
				})
			);
		},
	};

	useEffect(() => {
		document.title = 'Category - Management - Financial Diary App';
	}, []);

	return (
		<MainLayout>
			<AppBreadcrumb />
			<div className='flex justify-between items-center mb-5'>
				<AppTitle
					title='Management Category'
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
						Create Category
					</Space>
				</AppButton>
			</div>
			{isLoading ? (
				<AppLoader />
			) : categories.length > 0 ? (
				<>
					<div className='flex justify-start mb-3'>
						<AppSearchInput
							placeholder='Search Category Name'
							onSearch={handleSearch}
							onChange={handleChangeSearch}
							loading={isSearching}
						/>
					</div>
					<AppTable
						dataSource={categoriesList}
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

export default ManagementCategoryPage;
