import AppTitle from '../../Components/General/AppTitle';
import FrontLayout from '../../Layouts/FrontLayout/index';

const DashboardPage: React.FC = () => {
	return (
		<FrontLayout>
			<AppTitle
				title='this is dashboard page'
				level={3}
			/>
		</FrontLayout>
	);
};

export default DashboardPage;
