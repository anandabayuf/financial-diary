import MainLayout from '../../../../Layouts/MainLayout';
import AppBreadcrumb from '../../../../Components/General/AppBreadcrumb/index';
import AppTitle from '../../../../Components/General/AppTitle/index';
import WalletForm from '../../../../Components/Management/Wallets/WalletForm/index';
import { useState } from 'react';
import { editUserWallet } from '../../../../Api/Wallets';
import { useAppSelector } from '../../../../Hooks/useRedux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRouteNames } from '../../../../Utils/RouteUtils';
import RouteNames from '../../../../Constants/RouteNames';
import withEditWallet from '../../../../Components/Management/Wallets/WalletForm/withEditWallet';
import AppMessage from '../../../../Components/General/AppMessage/index';

const EditForm = withEditWallet(WalletForm);

const EditWalletPage: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const token = useAppSelector((state) => state.user.accessToken);
	const navigate = useNavigate();
	const location = useLocation();
	const wallet = location.state;

	const handleEditWallet = async (values: any) => {
		setIsLoading(true);

		const response = await editUserWallet(token, wallet._id, values);
		setIsLoading(false);
		if (response.request.status === 201) {
			navigate(getRouteNames(RouteNames.MANAGEMENT_WALLETS), {
				replace: true,
				state: {
					message: response.data.message,
				},
			});
		} else {
			AppMessage({ content: response.data.message, type: 'error' });
		}
	};

	return (
		<MainLayout>
			<AppBreadcrumb className='mb-1' />
			<div className='mb-5'>
				<AppTitle
					title='Edit Wallet'
					level={5}
				/>
			</div>
			<EditForm
				isLoading={isLoading}
				handleSubmit={handleEditWallet}
				data={wallet}
			/>
		</MainLayout>
	);
};

export default EditWalletPage;
