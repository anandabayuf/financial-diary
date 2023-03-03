import { Form } from 'antd';
import AppFormItem from '../../General/AppFormItem';
import AppInput from '../../General/AppInput';
import { ForgotPasswordFormProps } from './interfaces/interfaces';
import AppButton from '../../General/AppButton/index';

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
	I18n,
	form,
	isLoading,
	handleSend,
}) => {
	return (
		<Form
			form={form}
			onFinish={handleSend}
			autoComplete='on'
			layout='vertical'
		>
			<AppFormItem
				name='username'
				label={I18n?.t('form.label.username')}
				rules={[
					{
						required: true,
						message: I18n?.t('form.required.username')!,
					},
				]}
			>
				<AppInput placeholder={I18n?.t('form.placeholder.username')} />
			</AppFormItem>
			<AppFormItem
				name='email'
				label={I18n?.t('form.label.email')}
				rules={[
					{
						required: true,
						message: I18n?.t('form.required.email')!,
					},
					{
						type: 'email',
						message: I18n?.t('form.validation.email')!,
					},
				]}
			>
				<AppInput placeholder={I18n?.t('form.placeholder.email')} />
			</AppFormItem>

			<AppFormItem>
				<AppButton
					htmlType='submit'
					block
					type='primary'
					loading={isLoading}
				>
					{I18n?.t('label.send_email_reset_password')}
				</AppButton>
			</AppFormItem>
		</Form>
	);
};

export default ForgotPasswordForm;
