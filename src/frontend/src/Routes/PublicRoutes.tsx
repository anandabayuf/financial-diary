import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import { getRouteNames } from '../Utils/RouteUtils';
import RouteNames from '../Constants/RouteNames';
import LoginPage from '../Pages/Login';
import useAuth from '../Hooks/useAuth';
import RegisterPage from '../Pages/Register';

const LoginRoute = () => {
	const isLoggedIn = useAuth();

	return isLoggedIn ? <Navigate to='/dashboard' /> : <Outlet />;
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
		],
	},
	{
		path: '*',
		element: <Navigate to='/login' />,
	},
];

export default PublicRoutes;
