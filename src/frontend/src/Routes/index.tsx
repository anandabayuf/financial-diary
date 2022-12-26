import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import SecuredRoutes from './SecuredRoutes';

const AppRoutes = () => {
	return (
		<RouterProvider
			router={createBrowserRouter([...PublicRoutes, ...SecuredRoutes])}
		/>
	);
};

export default AppRoutes;
