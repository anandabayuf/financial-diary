import { Col, message } from 'antd';
import AppCard from '../../Components/General/AppCard';
import FrontLayout from '../../Layouts/FrontLayout';
import LoginIllustration from '../../Assets/Images/Login/login-illustration.jpg';
import LoginForm from '../../Components/Login/LoginForm';
import StyledContainer from './styled/StyledContainer';
import AppButton from '../../Components/General/AppButton';
import AppText from '../../Components/General/AppText';
import StyledRegisterContainer from './styled/StyledRegisterContainer';
import { login } from '../../Api/Auth';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../Hooks/useRedux';
import { setUserLoggedIn } from '../../Store/User/UserSlice';
import { decodeJWT } from '../../Utils/AuthUtils';
import { useLocation, useNavigate } from 'react-router-dom';
import StyledTitle from './styled/StyledTitle';
import { getUserById } from '../../Api/User';

const LoginPage: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const handleLogin = async (values: string) => {
		setLoading(true);

		const res = await login(values);
		// console.log(res);
		if (res.request.status === 401) {
			messageApi.error(res.response.data.detail);
		} else {
			const jwtDecoded: any = decodeJWT(res.data.token);

			const responseGetUser = await getUserById(
				jwtDecoded.id,
				res.data.token
			);

			const user = await responseGetUser.data.data;

			dispatch(
				setUserLoggedIn({
					accessToken: res.data.token,
					data: await user,
				})
			);
		}

		setLoading(false);
	};

	const handleLoginFailed = (errorInfo: string) => {
		// console.log(errorInfo);
	};

	const handleClickRegister = () => {
		navigate('/register');
	};

	useEffect(() => {
		const stateReceiveAction = () => {
			if (location.state) {
				messageApi.info(location.state.message);
				window.history.replaceState({}, document.title);
			}
		};

		stateReceiveAction(); // eslint-disable-next-line
	}, [location.state]);

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
						<StyledTitle
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
								onClick={handleClickRegister}
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
