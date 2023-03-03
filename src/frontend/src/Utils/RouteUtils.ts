import RouteNames from '../Constants/RouteNames';

export const getRouteNames = (route: string): string => {
	switch (route) {
		case RouteNames.LOGIN:
			return '/login';
		case RouteNames.REGISTER:
			return '/register';
		case RouteNames.VERIFY_EMAIL:
			return '/email-verification';
		case RouteNames.FORGOT_PASSWORD:
			return '/forgot-password';
		case RouteNames.RESET_PASSWORD:
			return '/reset-password';
		// case RouteNames.DASHBOARD:
		// 	return '/dashboard';
		case RouteNames.MANAGEMENT_WALLETS:
			return '/management/wallets';
		case RouteNames.CREATE_WALLETS:
			return '/management/wallets/create';
		case RouteNames.EDIT_WALLETS:
			return '/management/wallets/edit/:id';
		case RouteNames.MANAGEMENT_CATEGORY:
			return '/management/category';
		case RouteNames.CREATE_CATEGORY:
			return '/management/category/create';
		case RouteNames.EDIT_CATEGORY:
			return '/management/category/edit/:id';
		case RouteNames.NOTES:
			return '/notes';
		case RouteNames.CREATE_NOTE:
			return '/notes/create';
		case RouteNames.DETAIL_NOTE:
			return '/notes/:year/:month';
		case RouteNames.NOTE_ITEMS:
			return '/notes/:year/:month/:name';
		case RouteNames.CREATE_NOTE_ITEMS:
			return '/notes/:year/:month/:name/create';
		case RouteNames.EDIT_NOTE_ITEMS:
			return '/notes/:year/:month/:name/edit';
		case RouteNames.MY_PROFILE:
			return '/my-profile';
		case RouteNames.CHANGE_PASSWORD:
			return '/change-password';
		case RouteNames.ABOUT_US:
			return '/about-us';
		default:
			return '/';
	}
};
