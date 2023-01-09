import MainLayout from '../../../../Layouts/MainLayout';
import AppBreadcrumb from '../../../../Components/General/AppBreadcrumb/index';
import AppTitle from '../../../../Components/General/AppTitle/index';
import withCreateWallet from '../../../../Components/Management/Wallets/WalletForm/withCreateWallet';
import WalletForm from '../../../../Components/Management/Wallets/WalletForm/index';
import { useState } from 'react';
import { createUserWallet } from '../../../../Api/Wallets';
import { useAppSelector } from '../../../../Hooks/useRedux';
import { useNavigate } from 'react-router-dom';
import { getRouteNames } from '../../../../Utils/RouteUtils';
import RouteNames from '../../../../Constants/RouteNames';
import { message } from 'antd';

const CreateForm = withCreateWallet(WalletForm);

const CreateWalletPage: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const token = useAppSelector((state) => state.user.accessToken);
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const handleCreateWallet = async (values: any) => {
		setIsLoading(true);

		const response = await createUserWallet(token, values);
		// console.log(response);
		setIsLoading(false);
		if (response.request.status === 201) {
			// messageApi.success(response.data.message);
			navigate(getRouteNames(RouteNames.MANAGEMENT_WALLETS), {
				replace: true,
				state: {
					message: response.data.message,
				},
			});
		} else {
			messageApi.error(response.data.message);
		}
	};

	return (
		<MainLayout>
			{contextHolder}
			<AppBreadcrumb className='mb-1' />
			<div className='mb-5'>
				<AppTitle
					title='Create New Wallet'
					level={5}
				/>
			</div>
			<CreateForm
				isLoading={isLoading}
				handleSubmit={handleCreateWallet}
			/>
		</MainLayout>
	);
};

export default CreateWalletPage;
