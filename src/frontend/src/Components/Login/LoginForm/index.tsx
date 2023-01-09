import { Form } from 'antd';
import { LoginFormProps } from './interfaces/interfaces';
import AppFormItem from '../../General/AppFormItem/index';
import AppButton from '../../General/AppButton/index';
import AppInput from '../../General/AppInput/index';

const LoginForm: React.FC<LoginFormProps> = ({
	handleFinish,
	handleFinishFailed,
	loading,
}) => {
	return (
		<Form
			onFinish={handleFinish}
			onFinishFailed={handleFinishFailed}
			autoComplete='on'
			layout='vertical'
		>
			<AppFormItem
				label='Username'
				name='username'
				rules={[
					{ required: true, message: 'Please input your username!' },
				]}
			>
				<AppInput placeholder='input your username' />
			</AppFormItem>

			<AppFormItem
				label='Password'
				name='password'
				rules={[
					{ required: true, message: 'Please input your password!' },
				]}
			>
				<AppInput
					isPassword
					placeholder='input your password'
				/>
			</AppFormItem>

			<AppFormItem>
				<AppButton
					htmlType='submit'
					block
					type='primary'
					loading={loading}
				>
					Login
				</AppButton>
			</AppFormItem>
		</Form>
	);
};

export default LoginForm;
