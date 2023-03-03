import AppCard from '../../Components/General/AppCard';
import FrontLayout from '../../Layouts/FrontLayout';
import AppLogo from '../../Components/General/AppLogo/index';
import AppTitle from '../../Components/General/AppTitle/index';
import useLocale from '../../Hooks/useLocale';
import { useEffect, useState } from 'react';
import { APP_NAME } from '../../Constants/Constants';
import AppText from '../../Components/General/AppText/index';
import ForgotPasswordForm from '../../Components/ForgotPassword/ForgotPasswordForm';
import { Form } from 'antd';
import { Link } from 'react-router-dom';
import { getRouteNames } from '../../Utils/RouteUtils';
import RouteNames from '../../Constants/RouteNames';
import AppButton from '../../Components/General/AppButton';
import { forgotPassword } from '../../Api/Auth';
import AppNotification from '../../Components/General/AppNotification';
import { errorHandling } from '../../Api/errorHandling';

const ForgotPasswordPage: React.FC = () => {
	const { I18n, language } = useLocale();

	const [form] = Form.useForm();

	const [isLoading, setIsLoading] = useState(false);

	const handleSend = async (values: any) => {
		if (values) {
			setIsLoading(true);

			try {
				const res = await forgotPassword(values);
				form.resetFields();
				AppNotification({
					type: 'success',
					message: I18n.t(res.data.message),
					description: I18n.t(res.data.data),
				});
			} catch (error) {
				errorHandling(error, I18n);
			}

			setIsLoading(false);
		}
	};

	useEffect(() => {
		document.title = `${I18n.t('forgot_password')} - ${APP_NAME}`;
	}, [I18n, language]);

	return (
		<FrontLayout>
			<AppCard className='max-w-[500px]'>
				<div className='min-[426px]:hidden flex justify-center mb-3'>
					<AppLogo width='128px' />
				</div>
				<div className='flex justify-between items-baseline mb-5'>
					<AppTitle
						level={4}
						title={I18n.t('forgot_password')!}
					/>
					<div className='max-[425px]:hidden'>
						<AppLogo width='128px' />
					</div>
				</div>
				<div className='mb-5'>
					<AppText
						text={I18n.t('content.forgot_password')}
						muted
					/>
				</div>
				<ForgotPasswordForm
					form={form}
					I18n={I18n}
					isLoading={isLoading}
					handleSend={handleSend}
				/>
				<div className='flex justify-center'>
					<Link to={getRouteNames(RouteNames.LOGIN)}>
						<AppButton type='link'>
							{I18n.t('label.back_to_login')}
						</AppButton>
					</Link>
				</div>
			</AppCard>
		</FrontLayout>
	);
};

export default ForgotPasswordPage;
