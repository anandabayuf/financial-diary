import { Outlet, RouteObject, Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { getRouteNames } from '../Utils/RouteUtils';
import RouteNames from '../Constants/RouteNames';
import DashboardPage from '../Pages/Dashboard';
import ManagementCategoryPage from '../Pages/Management/Category';
import ManagementWalletPage from '../Pages/Management/Wallet/WalletList/index';
import NotesPage from '../Pages/Notes/index';
import CreateWalletPage from '../Pages/Management/Wallet/CreateWallet/index';
import EditWalletPage from '../Pages/Management/Wallet/EditWallet/index';

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
			{
				path: '/management/*',
				element: (
					<Navigate
						to={getRouteNames(RouteNames.MANAGEMENT_WALLETS)}
					/>
				),
			},
			{
				path: getRouteNames(RouteNames.MANAGEMENT_CATEGORY),
				element: <ManagementCategoryPage />,
			},
			{
				path: getRouteNames(RouteNames.MANAGEMENT_WALLETS),
				element: <ManagementWalletPage />,
			},
			{
				path: getRouteNames(RouteNames.CREATE_WALLETS),
				element: <CreateWalletPage />,
			},
			{
				path: getRouteNames(RouteNames.EDIT_WALLETS),
				element: <EditWalletPage />,
			},
			{
				path: getRouteNames(RouteNames.NOTES),
				element: <NotesPage />,
			},
		],
	},
];

export default SecuredRoutes;
