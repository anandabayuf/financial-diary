import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import { getRouteNames } from '../Utils/RouteUtils';
import RouteNames from '../Constants/RouteNames';
import LoginPage from '../Pages/Login';
import useAuth from '../Hooks/useAuth';
import RegisterPage from '../Pages/Register';
import VerifyEmailPage from '../Pages/VerifyEmail';
import ForgotPasswordPage from '../Pages/ForgotPassword';
import ResetPasswordPage from '../Pages/ResetPassword';

const LoginRoute = () => {
	const isLoggedIn = useAuth();

	return isLoggedIn ? (
		<Navigate to={getRouteNames(RouteNames.NOTES)} />
	) : (
		<Outlet />
	);
};

const PublicRoutes: RouteObject[] = [
	{
		element: <LoginRoute />,
		children: [
			{
				path: getRouteNames(RouteNames.LOGIN),
				element: <LoginPage />,
			},
			{
				path: getRouteNames(RouteNames.REGISTER),
				element: <RegisterPage />,
			},
			{
				path: getRouteNames(RouteNames.VERIFY_EMAIL),
				element: <VerifyEmailPage />,
			},
			{
				path: getRouteNames(RouteNames.FORGOT_PASSWORD),
				element: <ForgotPasswordPage />,
			},
			{
				path: getRouteNames(RouteNames.RESET_PASSWORD),
				element: <ResetPasswordPage />,
			},
		],
	},
	{
		path: '*',
		element: <Navigate to='/login' />,
	},
];

export default PublicRoutes;
