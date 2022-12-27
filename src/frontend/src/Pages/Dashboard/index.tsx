import AppTitle from '../../Components/General/AppTitle';
import MainLayout from '../../Layouts/MainLayout/index';

const DashboardPage: React.FC = () => {
	return (
		<MainLayout>
			<AppTitle
				title='this is dashboard page'
				level={3}
			/>
		</MainLayout>
	);
};

export default DashboardPage;
