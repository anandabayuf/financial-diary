import MainLayout from '../../../../Layouts/MainLayout';
import AppBreadcrumb from '../../../../Components/General/AppBreadcrumb/index';
import AppTitle from '../../../../Components/General/AppTitle/index';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../../../Hooks/useRedux';
import { useNavigate } from 'react-router-dom';
import { getRouteNames } from '../../../../Utils/RouteUtils';
import RouteNames from '../../../../Constants/RouteNames';
import withCreateCategory from '../../../../Components/Management/Category/CategoryForm/withCreateCategory';
import CategoryForm from '../../../../Components/Management/Category/CategoryForm/index';
import { createUserCategory } from '../../../../Api/Category';
import AppMessage from '../../../../Components/General/AppMessage/index';
import { errorHandling } from '../../../../Api/errorHandling';
import useLocale from '../../../../Hooks/useLocale';
import { APP_NAME } from '../../../../Constants/Constants';

const CreateForm = withCreateCategory(CategoryForm);

const CreateCategoryPage: React.FC = () => {
	const token = useAppSelector((state) => state.user.accessToken);
	const navigate = useNavigate();
	const { I18n, language } = useLocale();

	const [isLoading, setIsLoading] = useState(false);

	const handleCreateCategory = async (values: any) => {
		setIsLoading(true);

		try {
			const response = await createUserCategory(token, values);
			navigate(getRouteNames(RouteNames.MANAGEMENT_CATEGORY), {
				replace: true,
			});
			AppMessage({
				type: 'success',
				content: I18n.t(response.data.message),
			});
		} catch (error) {
			errorHandling(error, I18n);
		}

		setIsLoading(false);
	};

	useEffect(() => {
		document.title = `${I18n.t(
			'title.management.category.create'
		)} - ${APP_NAME}`;
	}, [I18n, language]);

	return (
		<MainLayout>
			<AppBreadcrumb className='mb-1' />
			<div className='mb-5'>
				<AppTitle
					title={I18n.t('management.category.create')!}
					level={5}
				/>
			</div>
			<CreateForm
				isLoading={isLoading}
				handleSubmit={handleCreateCategory}
				I18n={I18n}
			/>
		</MainLayout>
	);
};

export default CreateCategoryPage;
