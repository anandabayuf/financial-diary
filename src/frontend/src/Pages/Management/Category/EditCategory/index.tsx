import MainLayout from '../../../../Layouts/MainLayout';
import AppBreadcrumb from '../../../../Components/General/AppBreadcrumb/index';
import AppTitle from '../../../../Components/General/AppTitle/index';
import { useState } from 'react';
import { useAppSelector } from '../../../../Hooks/useRedux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRouteNames } from '../../../../Utils/RouteUtils';
import RouteNames from '../../../../Constants/RouteNames';
import { message } from 'antd';
import withEditCategory from '../../../../Components/Management/Category/CategoryForm/withEditCategory';
import CategoryForm from '../../../../Components/Management/Category/CategoryForm/index';
import { editUserCategory } from '../../../../Api/Category';

const EditForm = withEditCategory(CategoryForm);

const EditCategoryPage: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const token = useAppSelector((state) => state.user.accessToken);
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const location = useLocation();
	const category = location.state;

	const handleEditCategory = async (values: any) => {
		// console.log(values);
		setIsLoading(true);

		const response = await editUserCategory(token, category._id, values);
		// console.log(response);
		setIsLoading(false);
		if (response.request.status === 201) {
			// messageApi.success(response.data.message);
			navigate(getRouteNames(RouteNames.MANAGEMENT_CATEGORY), {
				replace: true,
				state: {
					message: response.data.message,
				},
			});
		} else {
			messageApi.error(response.data.message);
		}
	};

	return (
		<MainLayout>
			{contextHolder}
			<AppBreadcrumb className='mb-1' />
			<div className='mb-5'>
				<AppTitle
					title='Edit Category'
					level={5}
				/>
			</div>
			<EditForm
				isLoading={isLoading}
				handleSubmit={handleEditCategory}
				data={category}
			/>
		</MainLayout>
	);
};

export default EditCategoryPage;
