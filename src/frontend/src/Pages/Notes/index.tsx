import AppTitle from '../../Components/General/AppTitle';
import MainLayout from '../../Layouts/MainLayout/index';

const NotesPage: React.FC = () => {
	return (
		<MainLayout>
			<AppTitle
				title='this is notes page'
				level={3}
			/>
		</MainLayout>
	);
};

export default NotesPage;
