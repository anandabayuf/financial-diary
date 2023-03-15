import AppTitle from '../../../Components/General/AppTitle';
import MainLayout from '../../../Layouts/MainLayout';
import { useState, useEffect } from 'react';
import { closeNote, getUserNoteByDate } from '../../../Api/Notes';
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
	getTwoDigitMonthStringFromDate,
} from '../../../Utils/DateUtils';
import {
	setActiveKeyNoteTab,
	setSelectedNote,
} from '../../../Store/Note/NoteSlice';
import useLocale from '../../../Hooks/useLocale';
import { errorHandling } from '../../../Api/errorHandling';
import { APP_NAME } from '../../../Constants/Constants';
import {
	TFetchErrorResponse,
	TNoteResponse,
} from '../../../Api/interfaces/types';
import AppButton from '../../../Components/General/AppButton';
import AppTag from '../../../Components/General/AppTag';
import { IoCloseOutline } from 'react-icons/io5';
import { Space } from 'antd';
import CloseNoteModal from '../../../Components/Notes/DetailNote/CloseNoteModal';

const DetailNotePage: React.FC = () => {
	const token = useAppSelector((state) => state.user.accessToken);
	const navigate = useNavigate();
	const location = useLocation();
	const params = useParams();
	const dispatch = useAppDispatch();
	const { I18n, language } = useLocale();

	const { activeKeyNoteTab, selectedNote } = useAppSelector(
		(state) => state.note
	);

	const [note, setNote] = useState<TNoteResponse>();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [isClosingNote, setIsClosingNote] = useState<boolean>(false);
	const [isCloseNoteModalOpen, setIsCloseNoteModalOpen] =
		useState<boolean>(false);

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
			if (token) {
				try {
					const res = await getUserNoteByDate(
						token,
						`${selectedNote?.year}-${selectedNote?.month}`
					);
					const data = res.data.data;
					setNote(data[0]);
				} catch (error) {
					errorHandling(error as TFetchErrorResponse, navigate);
				}
			}

			setIsLoading(false);
		};

		getNote(); // eslint-disable-next-line
	}, []);

	const handleChangeTab = (activeKey: string) =>
		dispatch(setActiveKeyNoteTab(activeKey));

	const handleClickCloseNote = () => setIsCloseNoteModalOpen(true);

	const handleCancelCloseNote = () => setIsCloseNoteModalOpen(false);

	const handleCloseNote = async () => {
		setIsClosingNote(true);

		if (token && note) {
			try {
				const res = await closeNote(token, note._id);
				const resNote = res.data.data;
				setNote(resNote);
				dispatch(
					setSelectedNote({
						closed: resNote.closed,
						id: resNote._id,
						month: getTwoDigitMonthStringFromDate(resNote.date),
						year: getFullYearFromDate(resNote.date).toString(),
					})
				);

				handleCancelCloseNote();
			} catch (error) {
				errorHandling(error as TFetchErrorResponse, navigate);
			}
		}

		setIsClosingNote(false);
	};

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

	useEffect(() => {
		if (note) {
			document.title = `${getLongMonthFromDate(
				note.date,
				language
			)} ${getFullYearFromDate(note.date)} - ${
				activeKeyNoteTab === 'budget-note-tab'
					? I18n.t('title.note.detail.budget_tab')
					: activeKeyNoteTab === 'wallet-note-tab'
					? I18n.t('title.note.detail.wallet_tab')
					: I18n.t('title.note.detail.category_tab')
			} - ${APP_NAME}`;
		} else {
			document.title = `${I18n.t(
				'title.note.detail_note_not_found'
			)} - ${APP_NAME}`;
		}
	}, [note, activeKeyNoteTab, language, I18n]);

	return (
		<MainLayout>
			<AppBreadcrumb />
			{isLoading ? (
				<AppLoader isInPage />
			) : note ? (
				<>
					<div className='mb-5 flex justify-between items-center'>
						<AppTitle
							title={`${I18n.t(
								'title.note.detail'
							)} - ${getLongMonthFromDate(
								note.date,
								language
							)} - ${getFullYearFromDate(note.date)}`}
							level={5}
						/>
						{!selectedNote.closed ? (
							<AppButton
								type='primary'
								danger
								onClick={handleClickCloseNote}
							>
								<Space>
									<div className='flex justify-center'>
										<IoCloseOutline className='text-xl' />
									</div>
									{I18n.t('label.close_note')}
								</Space>
							</AppButton>
						) : (
							<AppTag color='error'>
								{I18n?.t('label.closed')}
							</AppTag>
						)}
					</div>
					<AppTabs
						items={DetailNoteTabs({
							noteId: note._id,
							I18n: I18n,
						})}
						onChange={handleChangeTab}
						activeKey={activeKeyNoteTab}
					/>
					{isCloseNoteModalOpen && (
						<CloseNoteModal
							data={note}
							I18n={I18n}
							isLoading={isClosingNote}
							isModalOpen={isCloseNoteModalOpen}
							language={language}
							handleCancel={handleCancelCloseNote}
							handleClose={handleCloseNote}
						/>
					)}
				</>
			) : (
				<AppEmpty isInPage />
			)}
		</MainLayout>
	);
};

export default DetailNotePage;
