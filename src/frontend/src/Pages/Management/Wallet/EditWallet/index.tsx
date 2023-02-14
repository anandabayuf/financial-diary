import MainLayout from '../../../../Layouts/MainLayout';
import AppBreadcrumb from '../../../../Components/General/AppBreadcrumb/index';
import AppTitle from '../../../../Components/General/AppTitle/index';
import WalletForm from '../../../../Components/Management/Wallets/WalletForm/index';
import { useState, useEffect } from 'react';
import { editUserWallet } from '../../../../Api/Wallets';
import { useAppSelector } from '../../../../Hooks/useRedux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRouteNames } from '../../../../Utils/RouteUtils';
import RouteNames from '../../../../Constants/RouteNames';
import withEditWallet from '../../../../Components/Management/Wallets/WalletForm/withEditWallet';
import AppMessage from '../../../../Components/General/AppMessage/index';
import useLocale from '../../../../Hooks/useLocale';
import { errorHandling } from '../../../../Api/errorHandling';

const EditForm = withEditWallet(WalletForm);

const EditWalletPage: React.FC = () => {
	const token = useAppSelector((state) => state.user.accessToken);
	const navigate = useNavigate();
	const location = useLocation();
	const wallet = location.state;
	const { I18n, language } = useLocale();

	const [isLoading, setIsLoading] = useState(false);

	const handleEditWallet = async (values: any) => {
		setIsLoading(true);

		try {
			const response = await editUserWallet(token, wallet._id, values);

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
			'title.management.wallet.edit'
		)} - Financial Diary App`;
	}, [language, I18n]);

	return (
		<MainLayout>
			<AppBreadcrumb className='mb-1' />
			<div className='mb-5'>
				<AppTitle
					title={I18n.t('management.wallet.edit')!}
					level={5}
				/>
			</div>
			<EditForm
				isLoading={isLoading}
				handleSubmit={handleEditWallet}
				data={wallet}
				I18n={I18n}
			/>
		</MainLayout>
	);
};

export default EditWalletPage;
