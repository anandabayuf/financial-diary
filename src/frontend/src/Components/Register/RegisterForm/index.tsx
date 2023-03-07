import { RegisterFormProps, RegisterFormType } from './interfaces/interfaces';
import AppFormItem from '../../General/AppFormItem/index';
import AppButton from '../../General/AppButton/index';
import AppInput from '../../General/AppInput/index';
import UploadButton from '../UploadButton/index';
import StyledUpload from './styled/StyledUpload';
import useTheme from '../../../Hooks/useTheme';
import StyledForm from './styled/StyledForm';
import useLocale from '../../../Hooks/useLocale';

const RegisterForm: React.FC<RegisterFormProps> = ({
	handleFinish,
	loading,
	handleUploadImage,
}) => {
	const { color } = useTheme();
	const { I18n } = useLocale();

	return (
		<StyledForm
			onFinish={(values) =>
				handleFinish && handleFinish(values as RegisterFormType)
			}
			autoComplete='on'
			layout='vertical'
		>
			<AppFormItem
				label={I18n.t('form.label.profile_picture')}
				name='picture'
			>
				<StyledUpload
					bordercolor={color?.text}
					listType='picture-card'
					fileList={handleUploadImage?.fileList}
					onPreview={handleUploadImage?.handlePreviewProfilePic}
					onChange={handleUploadImage?.handleChangeUpload}
					beforeUpload={handleUploadImage?.handleBeforeUpload}
				>
					{handleUploadImage?.fileList!.length === 1 ? null : (
						<UploadButton />
					)}
				</StyledUpload>
			</AppFormItem>
			<AppFormItem
				label={I18n.t('form.label.name')}
				name='name'
				rules={[
					{
						required: true,
						message: I18n.t('form.required.name')!,
					},
				]}
			>
				<AppInput placeholder={I18n.t('form.placeholder.name')!} />
			</AppFormItem>

			<AppFormItem
				label={I18n.t('form.label.username')}
				name='username'
				rules={[
					{
						required: true,
						message: I18n.t('form.required.username')!,
					},
					{
						pattern: new RegExp(/^[^\s-]+$/g),
						message: I18n.t('form.validation.no_spaces')!,
					},
				]}
			>
				<AppInput placeholder={I18n.t('form.placeholder.username')!} />
			</AppFormItem>

			<AppFormItem
				label={I18n.t('form.label.email')}
				name='email'
				rules={[
					{
						required: true,
						message: I18n.t('form.required.email')!,
					},
					{
						type: 'email',
						message: I18n.t('form.validation.email')!,
					},
				]}
			>
				<AppInput placeholder={I18n.t('form.placeholder.email')!} />
			</AppFormItem>

			<AppFormItem
				label={I18n.t('form.label.password')}
				name='password'
				rules={[
					{
						required: true,
						message: I18n.t('form.required.password')!,
					},
				]}
			>
				<AppInput
					isPassword
					placeholder={I18n.t('form.placeholder.password')!}
				/>
			</AppFormItem>

			<AppFormItem
				label={I18n.t('form.label.password_confirmation')}
				name='passwordconfirm'
				rules={[
					{
						required: true,
						message: I18n.t('form.required.password_confirmation')!,
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject(
								new Error(
									I18n.t(
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
					placeholder={
						I18n.t('form.placeholder.password_confirmation')!
					}
				/>
			</AppFormItem>

			<AppFormItem>
				<AppButton
					htmlType='submit'
					block
					type='primary'
					loading={loading}
				>
					{I18n.t('register')}
				</AppButton>
			</AppFormItem>
		</StyledForm>
	);
};

export default RegisterForm;
