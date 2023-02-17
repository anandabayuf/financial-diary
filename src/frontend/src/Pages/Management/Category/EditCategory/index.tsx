import MainLayout from '../../../../Layouts/MainLayout';
import AppBreadcrumb from '../../../../Components/General/AppBreadcrumb/index';
import AppTitle from '../../../../Components/General/AppTitle/index';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../../../Hooks/useRedux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRouteNames } from '../../../../Utils/RouteUtils';
import RouteNames from '../../../../Constants/RouteNames';
import withEditCategory from '../../../../Components/Management/Category/CategoryForm/withEditCategory';
import CategoryForm from '../../../../Components/Management/Category/CategoryForm/index';
import { editUserCategory } from '../../../../Api/Category';
import AppMessage from '../../../../Components/General/AppMessage/index';
import useLocale from '../../../../Hooks/useLocale';
import { errorHandling } from '../../../../Api/errorHandling';

const EditForm = withEditCategory(CategoryForm);

const EditCategoryPage: React.FC = () => {
	const token = useAppSelector((state) => state.user.accessToken);
	const navigate = useNavigate();
	const location = useLocation();
	const category = location.state;

	const { I18n, language } = useLocale();

	const [isLoading, setIsLoading] = useState(false);

	const handleEditCategory = async (values: any) => {
		setIsLoading(true);

		try {
			const response = await editUserCategory(
				token,
				category._id,
				values
			);

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
			'title.management.category.edit'
		)} - Financial Diary App`;
	}, [I18n, language]);

	return (
		<MainLayout>
			<AppBreadcrumb className='mb-1' />
			<div className='mb-5'>
				<AppTitle
					title={I18n.t('management.category.edit')!}
					level={5}
				/>
			</div>
			<EditForm
				isLoading={isLoading}
				handleSubmit={handleEditCategory}
				data={category}
				I18n={I18n}
			/>
		</MainLayout>
	);
};

export default EditCategoryPage;
