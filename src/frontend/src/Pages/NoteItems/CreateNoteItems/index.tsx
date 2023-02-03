import AppBreadcrumb from '../../../Components/General/AppBreadcrumb';
import MainLayout from '../../../Layouts/MainLayout/index';
import AppTitle from '../../../Components/General/AppTitle/index';
import withCreateNoteItemsForm from '../../../Components/NoteItems/NoteItemsForm/withCreateNoteItemsForm';
import { useAppSelector } from '../../../Hooks/useRedux';
import NoteItemsForm from '../../../Components/NoteItems/NoteItemsForm/index';
import { useNavigate } from 'react-router-dom';

const CreateNoteItemsForm = withCreateNoteItemsForm(NoteItemsForm);

const CreateNoteItemsPage: React.FC = () => {
	const navigate = useNavigate();
	const { selectedNote, selectedCategoryNote, selectedWalletNote } =
		useAppSelector((state) => state.note);

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
			<CreateNoteItemsForm
				noteId={selectedNote?.id}
				isCategory={selectedCategoryNote?.id !== ''}
				isWallet={selectedWalletNote?.id !== ''}
				handleCancel={handleCancel}
			/>
		</MainLayout>
	);
};

export default CreateNoteItemsPage;
