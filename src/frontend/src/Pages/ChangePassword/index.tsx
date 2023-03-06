import AppBreadcrumb from '../../Components/General/AppBreadcrumb';
import AppTitle from '../../Components/General/AppTitle';
import MainLayout from '../../Layouts/MainLayout';
import useLocale from '../../Hooks/useLocale';
import { useEffect, useState } from 'react';
import { APP_NAME } from '../../Constants/Constants';
import ChangePasswordForm from '../../Components/ChangePassword/ChangePasswordForm';
import { Form } from 'antd';
import { changePassword } from '../../Api/User';
import { useAppSelector } from '../../Hooks/useRedux';
import { encryptPassword } from '../../Utils/AuthUtils';
import { errorHandling } from '../../Api/errorHandling';
import AppMessage from '../../Components/General/AppMessage/index';
import { useNavigate } from 'react-router-dom';

const ChangePasswordPage: React.FC = () => {
	const token = useAppSelector((state) => state.user.accessToken);
	const { I18n, language } = useLocale();
	const navigate = useNavigate();

	const [form] = Form.useForm();

	const [isLoading, setIsLoading] = useState(false);

	const handleChangePassword = async (values: any) => {
		if (values) {
			setIsLoading(true); // eslint-disable-next-line
			let { oldPassword, newPassword, newPasswordConfirmation } = values;

			let oldPasswordEncrypted = encryptPassword(oldPassword);
			let newPasswordEncrypted = encryptPassword(newPassword);

			let payload = {
				oldPassword: oldPasswordEncrypted,
				newPassword: newPasswordEncrypted,
			};

			try {
				const res = await changePassword(token, payload);
				AppMessage({
					type: 'success',
					content: I18n.t(res.data.message),
				});
				form.resetFields();
			} catch (error) {
				errorHandling(error, navigate);
			}

			setIsLoading(false);
		}
	};

	useEffect(() => {
		document.title = `${I18n.t('change_password')} - ${APP_NAME}`;
	}, [I18n, language]);

	return (
		<MainLayout>
			<AppBreadcrumb />
			<div className='mb-5'>
				<AppTitle
					level={5}
					title={I18n.t('change_password')!}
				/>
			</div>
			<ChangePasswordForm
				I18n={I18n}
				form={form}
				handleSubmit={handleChangePassword}
				isLoading={isLoading}
			/>
		</MainLayout>
	);
};

export default ChangePasswordPage;
