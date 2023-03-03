import { Form } from 'antd';
import AppFormItem from '../../General/AppFormItem';
import AppInput from '../../General/AppInput';
import { ResetPasswordFormProps } from './interfaces/interfaces';
import AppButton from '../../General/AppButton/index';

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
	I18n,
	isLoading,
	handleResetPassword,
}) => {
	return (
		<Form
			layout='vertical'
			autoComplete='on'
			onFinish={handleResetPassword}
		>
			<AppFormItem
				name='newPassword'
				label={I18n?.t('form.label.new_password')}
				rules={[
					{
						required: true,
						message: I18n?.t('form.required.new_password')!,
					},
				]}
			>
				<AppInput
					isPassword
					placeholder={I18n?.t('form.placeholder.new_password')}
				/>
			</AppFormItem>
			<AppFormItem
				name='newPasswordConfirmation'
				label={I18n?.t('form.label.new_password_confirmation')}
				rules={[
					{
						required: true,
						message: I18n?.t(
							'form.required.new_password_confirmation'
						)!,
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (
								!value ||
								getFieldValue('newPassword') === value
							) {
								return Promise.resolve();
							}
							return Promise.reject(
								new Error(
									I18n?.t(
										'form.validation.password_not_match'
									)!
								)
							);
						},
					}),
				]}
			>
				<AppInput
					isPassword
					placeholder={I18n?.t(
						'form.placeholder.new_password_confirmation'
					)}
				/>
			</AppFormItem>
			<AppFormItem>
				<AppButton
					htmlType='submit'
					block
					type='primary'
					loading={isLoading}
				>
					{I18n?.t('label.reset_password')}
				</AppButton>
			</AppFormItem>
		</Form>
	);
};

export default ResetPasswordForm;
