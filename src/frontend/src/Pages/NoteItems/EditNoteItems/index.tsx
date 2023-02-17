import AppBreadcrumb from '../../../Components/General/AppBreadcrumb';
import MainLayout from '../../../Layouts/MainLayout/index';
import AppTitle from '../../../Components/General/AppTitle/index';
import { useAppSelector } from '../../../Hooks/useRedux';
import NoteItemsForm from '../../../Components/NoteItems/NoteItemsForm/index';
import { useNavigate, useLocation } from 'react-router-dom';
import withEditNoteItemsForm from '../../../Components/NoteItems/NoteItemsForm/withEditNoteItemsForm';
import useLocale from '../../../Hooks/useLocale';

const EditNoteItemsForm = withEditNoteItemsForm(NoteItemsForm);

const EditNoteItemsPage: React.FC = () => {
	const navigate = useNavigate();
	const { selectedNote, selectedCategoryNote, selectedWalletNote } =
		useAppSelector((state) => state.note);
	const location = useLocation();

	const { I18n } = useLocale();

	const handleCancel = () => navigate(-1);

	return (
		<MainLayout>
			<AppBreadcrumb />
			<div className='mb-5'>
				<AppTitle
					title={I18n.t('notes.items.edit')!}
					level={5}
				/>
			</div>
			<EditNoteItemsForm
				noteId={selectedNote?.id}
				isCategory={selectedCategoryNote?.id !== ''}
				isWallet={selectedWalletNote?.id !== ''}
				handleCancel={handleCancel}
				data={location.state}
                I18n={I18n}
			/>
		</MainLayout>
	);
};

export default EditNoteItemsPage;
