import MainLayout from '../../../../Layouts/MainLayout';
import AppBreadcrumb from '../../../../Components/General/AppBreadcrumb/index';
import AppTitle from '../../../../Components/General/AppTitle/index';
import withCreateWallet from '../../../../Components/Management/Wallets/WalletForm/withCreateWallet';
import WalletForm from '../../../../Components/Management/Wallets/WalletForm/index';
import { useState, useEffect } from 'react';
import { createUserWallet } from '../../../../Api/Wallets';
import { useAppSelector } from '../../../../Hooks/useRedux';
import { useNavigate } from 'react-router-dom';
import { getRouteNames } from '../../../../Utils/RouteUtils';
import RouteNames from '../../../../Constants/RouteNames';
import AppMessage from '../../../../Components/General/AppMessage/index';
import useLocale from '../../../../Hooks/useLocale';
import { errorHandling } from '../../../../Api/errorHandling';
import { APP_NAME } from '../../../../Constants/Constants';

const CreateForm = withCreateWallet(WalletForm);

const CreateWalletPage: React.FC = () => {
	const token = useAppSelector((state) => state.user.accessToken);
	const navigate = useNavigate();
	const { I18n, language } = useLocale();

	const [isLoading, setIsLoading] = useState(false);

	const handleCreateWallet = async (values: any) => {
		setIsLoading(true);

		try {
			const response = await createUserWallet(token, values);

			navigate(getRouteNames(RouteNames.MANAGEMENT_WALLETS), {
				replace: true,
			});
			AppMessage({
				type: 'success',
				content: I18n.t(response.data.message),
			});
		} catch (error) {
			errorHandling(error, I18n);
		}

		setIsLoading(false);
	};

	useEffect(() => {
		document.title = `${I18n.t(
			'title.management.wallet.create'
		)} - ${APP_NAME}`;
	}, [language, I18n]);

	return (
		<MainLayout>
			<AppBreadcrumb className='mb-1' />
			<div className='mb-5'>
				<AppTitle
					title={I18n.t('management.wallet.create')!}
					level={5}
				/>
			</div>
			<CreateForm
				isLoading={isLoading}
				handleSubmit={handleCreateWallet}
				I18n={I18n}
			/>
		</MainLayout>
	);
};

export default CreateWalletPage;
