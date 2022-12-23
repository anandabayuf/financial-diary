import RouteNames from '../Constants/RouteNames';

export const getRouteNames = (route: string): string => {
	switch (route) {
		case RouteNames.LOGIN:
			return '/login';
		default:
			return '/';
	}
};
