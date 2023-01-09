import RouteNames from '../Constants/RouteNames';

export const getRouteNames = (route: string): string => {
	switch (route) {
		case RouteNames.LOGIN:
			return '/login';
		case RouteNames.REGISTER:
			return '/register';
		case RouteNames.DASHBOARD:
			return '/dashboard';
		case RouteNames.MANAGEMENT_CATEGORY:
			return '/management/category';
		case RouteNames.MANAGEMENT_WALLETS:
			return '/management/wallets';
		case RouteNames.CREATE_WALLETS:
			return '/management/wallets/create';
		case RouteNames.EDIT_WALLETS:
			return '/management/wallets/edit/:id';
		case RouteNames.NOTES:
			return '/notes';
		default:
			return '/';
	}
};
