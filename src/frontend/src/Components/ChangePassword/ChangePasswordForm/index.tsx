import { Form } from 'antd';
import AppButton from '../../General/AppButton';
import AppFormItem from '../../General/AppFormItem';
import AppInput from '../../General/AppInput';
import AppLoader from '../../General/AppLoader';
import { ChangePasswordFormProps } from './interfaces/interfaces';

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
	form,
	I18n,
	isLoading,
	handleSubmit,
}) => {
	return (
		<Form
			autoComplete='on'
			layout='vertical'
			onFinish={handleSubmit}
			form={form}
		>
			<AppFormItem
				name='oldPassword'
				label={I18n?.t('form.label.old_password')}
				rules={[
					{
						required: true,
						message: I18n?.t('form.required.old_password')!,
					},
				]}
			>
				<AppInput
					isPassword
					placeholder={I18n?.t('form.placeholder.old_password')}
				/>
			</AppFormItem>
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
			{isLoading ? (
				<AppLoader />
			) : (
				<div className='flex justify-center'>
					<AppButton
						type='primary'
						htmlType='submit'
					>
						{I18n?.t('label.change_password')}
					</AppButton>
				</div>
			)}
		</Form>
	);
};

export default ChangePasswordForm;
