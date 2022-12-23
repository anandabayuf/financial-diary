import { PathRouteProps, Route, Routes } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import React, { Suspense } from 'react';

const AppRoutes = () => {
	return (
		<React.Fragment>
			<Suspense fallback='Loading...'>
				<Routes>
					{PublicRoutes.map(
						(route: PathRouteProps, index: React.Key) => (
							<Route
								key={index}
								{...route}
							/>
						)
					)}
				</Routes>
			</Suspense>
		</React.Fragment>
	);
};

export default AppRoutes;
