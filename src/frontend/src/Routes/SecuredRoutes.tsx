import { Outlet, RouteObject, Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { getRouteNames } from '../Utils/RouteUtils';
import RouteNames from '../Constants/RouteNames';
import DashboardPage from '../Pages/Dashboard';

const ProtectedRoute = () => {
	const isLoggedIn = useAuth();

	return isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
};

const SecuredRoutes: RouteObject[] = [
	{
		element: <ProtectedRoute />,
		children: [
			{
				path: getRouteNames(RouteNames.DASHBOARD),
				element: <DashboardPage />,
			},
		],
	},
];

export default SecuredRoutes;
