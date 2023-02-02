import { Outlet, RouteObject, Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { getRouteNames } from '../Utils/RouteUtils';
import RouteNames from '../Constants/RouteNames';
import DashboardPage from '../Pages/Dashboard';
import ManagementCategoryPage from '../Pages/Management/Category/CategoryList';
import ManagementWalletPage from '../Pages/Management/Wallet/WalletList/index';
import NotesPage from '../Pages/Notes/NotesList/index';
import CreateWalletPage from '../Pages/Management/Wallet/CreateWallet/index';
import EditWalletPage from '../Pages/Management/Wallet/EditWallet/index';
import CreateCategoryPage from '../Pages/Management/Category/CreateCategory/index';
import EditCategoryPage from '../Pages/Management/Category/EditCategory/index';
import CreateNotePage from '../Pages/Notes/CreateNote/index';
import DetailNotePage from '../Pages/Notes/DetailNote/index';
import MyProfilePage from '../Pages/MyProfile';
import NoteItemsPage from '../Pages/NoteItems/NoteItemsList/index';
import CreateNoteItemsPage from '../Pages/NoteItems/CreateNoteItems/index';
import EditNoteItemsPage from '../Pages/NoteItems/EditNoteItems/index';

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
				path: getRouteNames(RouteNames.MANAGEMENT_CATEGORY),
				element: <ManagementCategoryPage />,
			},
			{
				path: getRouteNames(RouteNames.CREATE_CATEGORY),
				element: <CreateCategoryPage />,
			},
			{
				path: getRouteNames(RouteNames.EDIT_CATEGORY),
				element: <EditCategoryPage />,
			},
			{
				path: '/notes/*',
				element: <Navigate to={getRouteNames(RouteNames.NOTES)} />,
			},
			{
				path: getRouteNames(RouteNames.NOTES),
				element: <NotesPage />,
			},
			{
				path: getRouteNames(RouteNames.CREATE_NOTE),
				element: <CreateNotePage />,
			},
			{
				path: getRouteNames(RouteNames.DETAIL_NOTE),
				element: <DetailNotePage />,
			},
			{
				path: getRouteNames(RouteNames.NOTE_ITEMS),
				element: <NoteItemsPage />,
			},
			{
				path: getRouteNames(RouteNames.CREATE_NOTE_ITEMS),
				element: <CreateNoteItemsPage />,
			},
			{
				path: getRouteNames(RouteNames.EDIT_NOTE_ITEMS),
				element: <EditNoteItemsPage />,
			},
			{
				path: getRouteNames(RouteNames.MY_PROFILE),
				element: <MyProfilePage />,
			},
		],
	},
];

export default SecuredRoutes;
