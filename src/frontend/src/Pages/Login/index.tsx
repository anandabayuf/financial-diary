import { Col, Row, Typography } from 'antd';
import AppCard from '../../Components/General/AppCard';
import FrontLayout from '../../Layouts/FrontLayout';
import LoginIllustration from '../../Assets/Images/Login/login-illustration.jpg';
import AppTitle from '../../Components/General/AppTitle/index';
import LoginForm from '../../Components/Login/LoginForm';
import StyledContainer from './styled/StyledContainer';
import AppButton from '../../Components/General/AppButton';

const LoginPage: React.FC = () => {
	const handleLogin = (values: string) => {
		console.log(values);
	};

	const handleLoginFailed = (errorInfo: string) => {
		console.log(errorInfo);
	};

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
						<AppTitle
							level={3}
							title='Welcome!'
						/>
						<LoginForm
							handleFinish={handleLogin}
							handleFinishFailed={handleLoginFailed}
						/>
						<AppButton type='text'>Register</AppButton>
					</Col>
				</StyledContainer>
			</AppCard>
		</FrontLayout>
	);
};

export default LoginPage;
