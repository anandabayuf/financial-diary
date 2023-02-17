import { Form } from 'antd';
import { LoginFormProps } from './interfaces/interfaces';
import AppFormItem from '../../General/AppFormItem/index';
import AppButton from '../../General/AppButton/index';
import AppInput from '../../General/AppInput/index';
import useLocale from '../../../Hooks/useLocale';

const LoginForm: React.FC<LoginFormProps> = ({
	handleFinish,
	handleFinishFailed,
	loading,
}) => {
	const { I18n } = useLocale();
	return (
		<Form
			onFinish={handleFinish}
			onFinishFailed={handleFinishFailed}
			autoComplete='on'
			layout='vertical'
		>
			<AppFormItem
				label={I18n.t('form.label.username')}
				name='username'
				rules={[
					{
						required: true,
						message: I18n.t('form.required.username')!,
					},
				]}
			>
				<AppInput placeholder={I18n.t('form.placeholder.username')!} />
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

			<AppFormItem>
				<AppButton
					htmlType='submit'
					block
					type='primary'
					loading={loading}
				>
					{I18n.t('login')}
				</AppButton>
			</AppFormItem>
		</Form>
	);
};

export default LoginForm;
