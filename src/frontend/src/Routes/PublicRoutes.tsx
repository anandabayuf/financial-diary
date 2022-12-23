import { Navigate, PathRouteProps } from 'react-router-dom';
import { getRouteNames } from '../Utils/RouteUtils';
import RouteNames from '../Constants/RouteNames';
import LoginPage from '../Pages/Login';

const PublicRoutes: PathRouteProps[] = [
	{
		path: getRouteNames(RouteNames.LOGIN),
		element: <LoginPage />,
	},
	{
		path: '*',
		element: <Navigate to='/login' />,
	},
];

export default PublicRoutes;
