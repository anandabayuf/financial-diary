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
import { useNavigate } from 'react-router-dom';
import { getRouteNames } from '../../../../Utils/RouteUtils';
import RouteNames from '../../../../Constants/RouteNames';
import { getAllUserCategory } from '../../../../Api/Category';
import AppSearchInput from '../../../../Components/General/AppSearchInput/index';
import { setManagementPaginationSize } from '../../../../Store/Management/ManagementSlice';
import { errorHandling } from '../../../../Api/errorHandling';
import useLocale from '../../../../Hooks/useLocale';
import { APP_NAME } from '../../../../Constants/Constants';

const ManagementCategoryPage: React.FC = () => {
	const token = useAppSelector((state) => state.user.accessToken);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { I18n, language } = useLocale();

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

			try {
				const res = await getAllUserCategory(token);
				let resCategories = [...res.data.data];

				resCategories = resCategories.map((category: any) => {
					category['key'] = category._id;
					return category;
				});

				setCategories(resCategories);
				setCategoriesList(resCategories);
			} catch (error) {
				errorHandling(error, navigate);
			}

			setIsLoading(false);
		};

		getCategory(); // eslint-disable-next-line
	}, []);

	const handleClickCreate = () => {
		navigate(getRouteNames(RouteNames.CREATE_CATEGORY));
	};

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
		document.title = `${I18n.t('title.management.category')} - ${APP_NAME}`;
	}, [I18n, language]);

	return (
		<MainLayout>
			<AppBreadcrumb />
			<div className='flex justify-between items-center mb-5'>
				<AppTitle
					title={I18n.t('management.category')!}
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
						{I18n.t('label.create.category')}
					</Space>
				</AppButton>
			</div>
			{isLoading ? (
				<AppLoader />
			) : categories.length > 0 ? (
				<>
					<div className='flex justify-start mb-3'>
						<AppSearchInput
							placeholder={
								I18n.t(
									'search.placeholder.management_category'
								)!
							}
							onSearch={handleSearch}
							onChange={handleChangeSearch}
							loading={isSearching}
						/>
					</div>
					<AppTable
						dataSource={categoriesList}
						columns={WalletColumns({
							navigate: navigate,
							I18n: I18n,
						})}
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
