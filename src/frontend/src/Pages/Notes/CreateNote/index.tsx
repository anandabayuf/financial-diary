import AppTitle from '../../../Components/General/AppTitle';
import MainLayout from '../../../Layouts/MainLayout';
import { useState } from 'react';
import AppBreadcrumb from '../../../Components/General/AppBreadcrumb';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../Hooks/useRedux';
import { DatePickerProps } from 'antd';
import NoteForm from '../../../Components/Notes/NoteForm/index';
import { createUserNote } from '../../../Api/Notes';
import { getRouteNames } from '../../../Utils/RouteUtils';
import RouteNames from '../../../Constants/RouteNames';
import AppMessage from '../../../Components/General/AppMessage/index';

const CreateNotePage: React.FC = () => {
	const token = useAppSelector((state) => state.user.accessToken);
	const navigate = useNavigate();
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
		const response = await createUserNote(token, payload);

		if (response.request.status === 201) {
			navigate(getRouteNames(RouteNames.NOTES), {
				replace: true,
				state: { message: response.data.message },
			});
		} else {
			AppMessage({
				type: 'error',
				content: `${response.response.data.message}. ${response.response.data.detail}`,
			});
		}

		setIsLoading(false);
	};

	return (
		<MainLayout>
			<AppBreadcrumb />
			<AppTitle
				title='Create Notes'
				level={5}
			/>
			<NoteForm
				isLoading={isLoading}
				handleSubmit={handleSubmit}
				handleChangeDatePicker={handleChangeDatePicker}
			/>
		</MainLayout>
	);
};

export default CreateNotePage;
