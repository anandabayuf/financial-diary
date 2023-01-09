import MainLayout from '../../../../Layouts/MainLayout';
import AppBreadcrumb from '../../../../Components/General/AppBreadcrumb/index';
import AppTitle from '../../../../Components/General/AppTitle/index';
import { useState } from 'react';
import { useAppSelector } from '../../../../Hooks/useRedux';
import { useNavigate } from 'react-router-dom';
import { getRouteNames } from '../../../../Utils/RouteUtils';
import RouteNames from '../../../../Constants/RouteNames';
import { message } from 'antd';
import withCreateCategory from '../../../../Components/Management/Category/CategoryForm/withCreateCategory';
import CategoryForm from '../../../../Components/Management/Category/CategoryForm/index';
import { createUserCategory } from '../../../../Api/Category';

const CreateForm = withCreateCategory(CategoryForm);

const CreateCategoryPage: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const token = useAppSelector((state) => state.user.accessToken);
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const handleCreateCategory = async (values: any) => {
		setIsLoading(true);

		const response = await createUserCategory(token, values);
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
					title='Create New Category'
					level={5}
				/>
			</div>
			<CreateForm
				isLoading={isLoading}
				handleSubmit={handleCreateCategory}
			/>
		</MainLayout>
	);
};

export default CreateCategoryPage;
