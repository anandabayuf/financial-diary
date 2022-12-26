import RouteNames from '../Constants/RouteNames';

export const getRouteNames = (route: string): string => {
	switch (route) {
		case RouteNames.LOGIN:
			return '/login';
		case RouteNames.REGISTER:
			return '/register';
		case RouteNames.DASHBOARD:
			return '/';
		default:
			return '';
	}
};
