import AppTitle from '../../../Components/General/AppTitle';
import MainLayout from '../../../Layouts/MainLayout/index';

const ManagementWalletPage: React.FC = () => {
	return (
		<MainLayout>
			<AppTitle
				title='this is management wallet page'
				level={3}
			/>
		</MainLayout>
	);
};

export default ManagementWalletPage;
