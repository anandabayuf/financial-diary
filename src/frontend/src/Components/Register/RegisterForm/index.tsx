import { Form } from 'antd';
import { RegisterFormProps } from './interfaces/interfaces';
import AppFormItem from '../../General/AppFormItem/index';
import AppButton from '../../General/AppButton/index';
import AppInput from '../../General/AppInput/index';
import UploadButton from '../UploadButton/index';
import StyledUpload from './styled/StyledUpload';
import useTheme from '../../../Hooks/useTheme';

const RegisterForm: React.FC<RegisterFormProps> = ({
	handleFinish,
	handleFinishFailed,
	loading,
	handleUploadImage,
}) => {
	const theme = useTheme();
	return (
		<>
			<Form
				name='basic'
				onFinish={handleFinish}
				onFinishFailed={handleFinishFailed}
				autoComplete='on'
				layout='vertical'
			>
				<AppFormItem
					label='Profile Picture'
					name='picture'
				>
					<StyledUpload
						bordercolor={theme?.text}
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
					label='Name'
					name='name'
					rules={[
						{
							required: true,
							message: 'Please input your name!',
						},
					]}
				>
					<AppInput placeholder='input your name' />
				</AppFormItem>

				<AppFormItem
					label='Username'
					name='username'
					rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
						{
							pattern: new RegExp(/^[^\s-]+$/g),
							message: 'No spaces allowed!',
						},
					]}
				>
					<AppInput placeholder='input your username' />
				</AppFormItem>

				<AppFormItem
					label='Password'
					name='password'
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
				>
					<AppInput
						isPassword
						placeholder='input your password'
					/>
				</AppFormItem>

				<AppFormItem
					label='Password Confirmation'
					name='passwordconfirm'
					rules={[
						{
							required: true,
							message: 'Please re-input your password!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (
									!value ||
									getFieldValue('password') === value
								) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error("password doesn't match!")
								);
							},
						}),
					]}
				>
					<AppInput
						isPassword
						placeholder='re-input your password'
					/>
				</AppFormItem>

				<AppFormItem>
					<AppButton
						htmlType='submit'
						block
						type='primary'
						loading={loading}
					>
						Register
					</AppButton>
				</AppFormItem>
			</Form>
		</>
	);
};

export default RegisterForm;
