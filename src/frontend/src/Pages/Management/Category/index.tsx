import AppTitle from '../../../Components/General/AppTitle';
import MainLayout from '../../../Layouts/MainLayout/index';

const ManagementCategoryPage: React.FC = () => {
	return (
		<MainLayout>
			<AppTitle
				title='this is management category page'
				level={3}
			/>
		</MainLayout>
	);
};

export default ManagementCategoryPage;
