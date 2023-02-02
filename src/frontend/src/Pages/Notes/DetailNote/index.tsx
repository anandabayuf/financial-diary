import AppTitle from '../../../Components/General/AppTitle';
import MainLayout from '../../../Layouts/MainLayout';
import { useState, useEffect } from 'react';
import { getUserNoteByDate } from '../../../Api/Notes';
import AppEmpty from '../../../Components/General/AppEmpty/index';
import AppLoader from '../../../Components/General/AppLoader';
import AppBreadcrumb from '../../../Components/General/AppBreadcrumb';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useRedux';
import AppMessage from '../../../Components/General/AppMessage/index';
import AppTabs from '../../../Components/General/AppTabs/index';
import DetailNoteTabs from '../../../Components/Notes/DetailNote/DetailNoteTabs/index';
import {
	getFullYearFromDate,
	getLongMonthFromDate,
} from '../../../Utils/DateUtils';
import { setActiveKeyNoteTab } from '../../../Store/Note/NoteSlice';

const DetailNotePage: React.FC = () => {
	const token = useAppSelector((state) => state.user.accessToken);
	const navigate = useNavigate();
	const location = useLocation();
	const params = useParams();
	const dispatch = useAppDispatch();

	const { activeKeyNoteTab, selectedNote } = useAppSelector(
		(state) => state.note
	);

	const [note, setNote] = useState<any>();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const navigateIfLocationIsNotMatch = () => {
			if (params) {
				if (
					params.year !== selectedNote?.year ||
					params.month !== selectedNote?.month
				) {
					navigate(
						`/notes/${selectedNote?.year}/${selectedNote?.month}`
					);
				}
			}
		};

		const getNote = async () => {
			setIsLoading(true);
			navigateIfLocationIsNotMatch();
			const res = await getUserNoteByDate(
				token,
				`${selectedNote?.year}-${selectedNote?.month}`
			);
			if (res.request.status === 200) {
				const data = res.data.data;
				setNote(data[0]);
			} else {
				const response = JSON.parse(res.request.response);

				AppMessage({ content: response.message, type: 'error' });
			}

			setIsLoading(false);
		};

		getNote(); // eslint-disable-next-line
	}, []);

	const handleChangeTab = (activeKey: string) =>
		dispatch(setActiveKeyNoteTab({ activeKeyNoteTab: activeKey }));

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
					<AppTabs
						items={DetailNoteTabs({
							noteId: note._id,
						})}
						onChange={handleChangeTab}
						activeKey={activeKeyNoteTab}
					/>
				</>
			) : (
				<AppEmpty />
			)}
		</MainLayout>
	);
};

export default DetailNotePage;
