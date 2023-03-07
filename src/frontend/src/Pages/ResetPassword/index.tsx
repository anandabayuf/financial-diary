import FrontLayout from '../../Layouts/FrontLayout';
import useLocale from '../../Hooks/useLocale';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { APP_NAME } from '../../Constants/Constants';
import { checkToken, resetPassword } from '../../Api/Auth';
import { getRouteNames } from '../../Utils/RouteUtils';
import RouteNames from '../../Constants/RouteNames';
import { errorHandling } from '../../Api/errorHandling';
import AppCard from '../../Components/General/AppCard';
import AppLoader from '../../Components/General/AppLoader';
import AppLogo from '../../Components/General/AppLogo/index';
import AppTitle from '../../Components/General/AppTitle/index';
import ResetPasswordForm from '../../Components/ResetPassword/ResetPasswordForm';
import { encryptPassword } from '../../Utils/AuthUtils';
import AppMessage from '../../Components/General/AppMessage';
import { TFetchErrorResponse } from '../../Api/interfaces/types';
import { ResetPasswordFormType } from '../../Components/ResetPassword/ResetPasswordForm/interfaces/interfaces';

const ResetPasswordPage: React.FC = () => {
	const { I18n, language } = useLocale();
	const navigate = useNavigate();

	const [searchParams] = useSearchParams();

	const [isCheckToken, setIsCheckToken] = useState(false);
	const [isLoading, setIsloading] = useState(false);

	useEffect(() => {
		const isTokenValid = async () => {
			setIsCheckToken(true);

			const token = searchParams.get('token');

			if (token !== null && token !== undefined && token !== '') {
				try {
					await checkToken(token);
				} catch (error) {
					navigate(getRouteNames(RouteNames.LOGIN), {
						replace: true,
					});
					errorHandling(error as TFetchErrorResponse, navigate);
				}
			} else {
				navigate(getRouteNames(RouteNames.LOGIN), { replace: true });
			}

			setIsCheckToken(false);
		};

		isTokenValid(); // eslint-disable-next-line
	}, [searchParams]);

	const handleResetPassword = async (values: ResetPasswordFormType) => {
		if (values) {
			setIsloading(true);
			const token = searchParams.get('token');
			if (token !== null && token !== undefined && token !== '') {
				const newPassword = values.newPassword;

				const encryptedPassword = encryptPassword(newPassword);
				const payload = {
					newPassword: encryptedPassword,
				};

				try {
					const res = await resetPassword(token, payload);

					navigate(getRouteNames(RouteNames.LOGIN), {
						replace: true,
					});

					AppMessage({
						type: 'success',
						content: I18n.t(res.data.message),
					});
				} catch (error) {
					errorHandling(error as TFetchErrorResponse, navigate);
				}
			}
			setIsloading(false);
		}
	};

	useEffect(() => {
		document.title = `${I18n.t('reset_password')} - ${APP_NAME}`;
	}, [I18n, language]);

	return (
		<FrontLayout>
			<AppCard className='min-w-[420px]'>
				<div className='min-[426px]:hidden flex justify-center mb-3'>
					<AppLogo width='128px' />
				</div>
				<div className='flex justify-between items-baseline mb-5'>
					<AppTitle
						level={4}
						title={I18n.t('reset_password')!}
					/>
					<div className='max-[425px]:hidden'>
						<AppLogo width='128px' />
					</div>
				</div>
				{isCheckToken ? (
					<AppLoader isInPage />
				) : (
					<ResetPasswordForm
						I18n={I18n}
						isLoading={isLoading}
						handleResetPassword={handleResetPassword}
					/>
				)}
			</AppCard>
		</FrontLayout>
	);
};

export default ResetPasswordPage;
