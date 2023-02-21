import { Col } from 'antd';
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
import { decodeJWT, encryptPassword } from '../../Utils/AuthUtils';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../Api/User';
import AppTitle from '../../Components/General/AppTitle/index';
import AppLogo from '../../Components/General/AppLogo';
import useLocale from '../../Hooks/useLocale';
import { errorHandling } from '../../Api/errorHandling';

const LoginPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const { I18n, language } = useLocale();

	const handleLogin = async (values: any) => {
		setLoading(true);

		try {
			const encryptedPass = await encryptPassword(values.password);

			const res = await login({
				username: values.username,
				password: encryptedPass,
			});

			const jwtDecoded: any = decodeJWT(res.data.token);

			try {
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
			} catch (error) {
				errorHandling(error, I18n);
			}
		} catch (error) {
			errorHandling(error, I18n);
		}

		setLoading(false);
	};

	const handleLoginFailed = (errorInfo: string) => {};

	const handleClickRegister = () => {
		navigate('/register');
	};

	useEffect(() => {
		document.title = `${I18n.t('login')} - Financial Diary App`;
	}, [language, I18n]);

	return (
		<FrontLayout>
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
						<div className='min-[426px]:hidden flex justify-center mb-3'>
							<AppLogo width='128px' />
						</div>
						<div className='flex justify-between items-baseline mb-5'>
							<AppTitle
								level={4}
								title={I18n.t('login')!}
							/>
							<div className='max-[425px]:hidden'>
								<AppLogo width='128px' />
							</div>
						</div>
						<LoginForm
							handleFinish={handleLogin}
							handleFinishFailed={handleLoginFailed}
							loading={loading}
						/>
						<StyledRegisterContainer>
							<AppText
								text={I18n.t('content.dont_have_an_account?')}
								className='text-xs'
							/>
							<AppButton
								type='link'
								onClick={handleClickRegister}
							>
								{I18n.t('register')}
							</AppButton>
						</StyledRegisterContainer>
					</Col>
				</StyledContainer>
			</AppCard>
		</FrontLayout>
	);
};

export default LoginPage;
