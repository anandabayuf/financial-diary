import AppBreadcrumb from '../../../Components/General/AppBreadcrumb';
import MainLayout from '../../../Layouts/MainLayout/index';
import AppTitle from '../../../Components/General/AppTitle/index';
import { useAppSelector } from '../../../Hooks/useRedux';
import NoteItemsForm from '../../../Components/NoteItems/NoteItemsForm/index';
import { useNavigate, useLocation } from 'react-router-dom';
import withEditNoteItemsForm from '../../../Components/NoteItems/NoteItemsForm/withEditNoteItemsForm';

const EditNoteItemsForm = withEditNoteItemsForm(NoteItemsForm);

const EditNoteItemsPage: React.FC = () => {
	const navigate = useNavigate();
	const { selectedNote, selectedCategoryNote, selectedWalletNote } =
		useAppSelector((state) => state.note);
	const location = useLocation();

	const handleCancel = () => navigate(-1);

	return (
		<MainLayout>
			<AppBreadcrumb />
			<div className='mb-5'>
				<AppTitle
					title={'Create Note Items'}
					level={5}
				/>
			</div>
			<EditNoteItemsForm
				noteId={selectedNote?.id}
				isCategory={selectedCategoryNote?.id !== ''}
				isWallet={selectedWalletNote?.id !== ''}
				handleCancel={handleCancel}
				data={location.state}
			/>
		</MainLayout>
	);
};

export default EditNoteItemsPage;
