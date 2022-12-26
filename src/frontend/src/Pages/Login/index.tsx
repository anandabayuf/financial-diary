import { Col, message } from 'antd';
import AppCard from '../../Components/General/AppCard';
import FrontLayout from '../../Layouts/FrontLayout';
import LoginIllustration from '../../Assets/Images/Login/login-illustration.jpg';
import AppTitle from '../../Components/General/AppTitle/index';
import LoginForm from '../../Components/Login/LoginForm';
import StyledContainer from './styled/StyledContainer';
import AppButton from '../../Components/General/AppButton';
import AppText from '../../Components/General/AppText';
import StyledRegisterContainer from './styled/StyledRegisterContainer';
import { login } from '../../Api/Auth';
import { useState } from 'react';
import { useAppDispatch } from '../../Hooks/useRedux';
import { setDarkMode } from '../../Store/Theme/ThemeSlice';
import { setUserLoggedIn } from '../../Store/User/UserSlice';
import { decodeJWT } from '../../Utils/AuthUtils';

const LoginPage: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const dispatch = useAppDispatch();

	const handleLogin = async (values: string) => {
		setLoading(true);

		const res = await login(values);
		console.log(res);
		if (res.request.status === 401) {
			messageApi.error(res.response.data.detail);
		} else {
			dispatch(
				setUserLoggedIn({
					accessToken: res.data.token,
					data: decodeJWT(res.data.token),
				})
			);
		}

		setLoading(false);
	};

	const handleLoginFailed = (errorInfo: string) => {
		// console.log(errorInfo);
	};

	return (
		<FrontLayout>
			{contextHolder}
			<AppCard>
				<StyledContainer
					justify={'center'}
					align={'middle'}
					gutter={[24, 0]}
				>
					<Col className='illustration-container'>
						<img
							src={LoginIllustration}
							alt='login-illustration'
							width='500px'
							className='rounded-lg'
						/>
					</Col>
					<Col className='login-form-container'>
						<AppTitle
							level={3}
							title='Welcome!'
						/>
						<LoginForm
							handleFinish={handleLogin}
							handleFinishFailed={handleLoginFailed}
							loading={loading}
						/>
						<StyledRegisterContainer>
							<AppText
								text="Don't have an account?"
								className='text-xs'
							/>
							<AppButton
								type='link'
								onClick={() => dispatch(setDarkMode())}
							>
								Register
							</AppButton>
						</StyledRegisterContainer>
					</Col>
				</StyledContainer>
			</AppCard>
		</FrontLayout>
	);
};

export default LoginPage;
