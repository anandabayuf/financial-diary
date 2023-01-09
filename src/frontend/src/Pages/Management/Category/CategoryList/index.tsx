import AppTitle from '../../../../Components/General/AppTitle';
import MainLayout from '../../../../Layouts/MainLayout/index';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../../../Hooks/useRedux';
import AppButton from '../../../../Components/General/AppButton';
import { BsPlusLg } from 'react-icons/bs';
import { Space, message } from 'antd';
import AppTable from '../../../../Components/General/AppTable/index';
import WalletColumns from './CategoryColumns';
import AppEmpty from '../../../../Components/General/AppEmpty/index';
import AppLoader from '../../../../Components/General/AppLoader';
import AppBreadcrumb from '../../../../Components/General/AppBreadcrumb';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRouteNames } from '../../../../Utils/RouteUtils';
import RouteNames from '../../../../Constants/RouteNames';
import { getAllUserCategory } from '../../../../Api/Category';

const ManagementCategoryPage: React.FC = () => {
	const token = useAppSelector((state) => state.user.accessToken);
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const location = useLocation();

	const [categories, setCategories] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const getCategory = async () => {
			setIsLoading(true);
			const res = await getAllUserCategory(token);
			// console.log(res);
			if (res.request.status === 200) {
				const resCategories = [...res.data.data];
				setCategories(
					resCategories.map((category: any) => {
						category['key'] = category._id;
						return category;
					})
				);
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
				messageApi.success(location.state.message);
				window.history.replaceState({}, document.title);
			}
		};

		stateReceiveAction(); // eslint-disable-next-line
	}, [location.state]);

	return (
		<MainLayout>
			{contextHolder}
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
				<AppTable
					dataSource={categories}
					columns={WalletColumns(navigate)}
				/>
			) : (
				<AppEmpty />
			)}
		</MainLayout>
	);
};

export default ManagementCategoryPage;
