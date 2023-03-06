import AppTitle from '../../../Components/General/AppTitle';
import MainLayout from '../../../Layouts/MainLayout';
import { useState, useEffect } from 'react';
import AppBreadcrumb from '../../../Components/General/AppBreadcrumb';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../Hooks/useRedux';
import { DatePickerProps } from 'antd';
import NoteForm from '../../../Components/Notes/CreateNote/NoteForm';
import { createUserNote } from '../../../Api/Notes';
import { getRouteNames } from '../../../Utils/RouteUtils';
import RouteNames from '../../../Constants/RouteNames';
import AppMessage from '../../../Components/General/AppMessage/index';
import useLocale from '../../../Hooks/useLocale';
import { errorHandling } from '../../../Api/errorHandling';
import { APP_NAME } from '../../../Constants/Constants';

const CreateNotePage: React.FC = () => {
	const token = useAppSelector((state) => state.user.accessToken);
	const navigate = useNavigate();
	const { I18n, language } = useLocale();

	const [isLoading, setIsLoading] = useState(false);
	const [dateString, setDateString] = useState<any>();

	const handleChangeDatePicker: DatePickerProps['onChange'] = (
		date,
		dateString
	) => {
		setDateString(dateString);
	};

	const handleSubmit = async (values: any) => {
		setIsLoading(true);

		const payload = {
			date: dateString,
		};

		try {
			const response = await createUserNote(token, payload);
			navigate(getRouteNames(RouteNames.NOTES), {
				replace: true,
			});
			AppMessage({
				type: 'success',
				content: I18n.t(response.data.message),
			});
		} catch (error) {
			errorHandling(error, navigate);
		}

		setIsLoading(false);
	};

	useEffect(() => {
		document.title = `${I18n.t('notes.create')}  - ${APP_NAME}`;
	}, [language, I18n]);

	return (
		<MainLayout>
			<AppBreadcrumb />
			<div className='mb-5'>
				<AppTitle
					title={I18n.t('notes.create')!}
					level={5}
				/>
			</div>
			<NoteForm
				isLoading={isLoading}
				handleSubmit={handleSubmit}
				handleChangeDatePicker={handleChangeDatePicker}
				I18n={I18n}
			/>
		</MainLayout>
	);
};

export default CreateNotePage;
