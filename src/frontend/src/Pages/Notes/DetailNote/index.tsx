import AppTitle from '../../../Components/General/AppTitle';
import MainLayout from '../../../Layouts/MainLayout';
import { useState, useEffect } from 'react';
import { getUserNoteByDate } from '../../../Api/Notes';
import AppEmpty from '../../../Components/General/AppEmpty/index';
import AppLoader from '../../../Components/General/AppLoader';
import AppBreadcrumb from '../../../Components/General/AppBreadcrumb';
import { useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../Hooks/useRedux';
import AppMessage from '../../../Components/General/AppMessage/index';
import AppTabs from '../../../Components/General/AppTabs/index';
import DetailNoteTabs from '../../../Components/Notes/DetailNote/DetailNoteTabs/index';
import {
	getFullYearFromDate,
	getLongMonthFromDate,
} from '../../../Utils/DateUtils';

const DetailNotePage: React.FC = () => {
	const token = useAppSelector((state) => state.user.accessToken);
	// const navigate = useNavigate();
	const location = useLocation();
	const params = useParams();

	const [note, setNote] = useState<any>();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const getNote = async () => {
			setIsLoading(true);

			const res = await getUserNoteByDate(
				token,
				`${params.year}-${params.month}`
			);
			if (res.request.status === 200) {
				setNote(res.data.data[0]);
			} else {
				const response = JSON.parse(res.request.response);

				AppMessage({ content: response.message, type: 'error' });
			}

			setIsLoading(false);
		};

		getNote(); // eslint-disable-next-line
	}, []);

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

	return (
		<MainLayout>
			<AppBreadcrumb />
			{isLoading ? (
				<AppLoader />
			) : note ? (
				<>
					<div className='mb-5'>
						<AppTitle
							title={`Notes - ${getLongMonthFromDate(
								note.date
							)} - ${getFullYearFromDate(note.date)}`}
							level={5}
						/>
					</div>
					<AppTabs items={DetailNoteTabs({ noteId: note._id })} />
				</>
			) : (
				<AppEmpty />
			)}
		</MainLayout>
	);
};

export default DetailNotePage;
