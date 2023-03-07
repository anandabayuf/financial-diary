import AppNotification from '../Components/General/AppNotification/index';
import AppMessage from '../Components/General/AppMessage/index';
import { NavigateFunction } from 'react-router-dom';
import { setUserLoggedOut } from '../Store/User/UserSlice';
import { store } from '../Store/index';
import { getRouteNames } from '../Utils/RouteUtils';
import RouteNames from '../Constants/RouteNames';
import I18n from '../Localization';
import { TFetchErrorResponse } from './interfaces/types';

export const errorHandling = (
	error: TFetchErrorResponse,
	navigate: NavigateFunction
) => {
	if (error) {
		if (error.code === 'ERR_NETWORK') {
			AppMessage({
				content: I18n.t(`network.ERR_NETWORK`),
				type: 'error',
			});
		} else if (error.request.status === 401 && navigate) {
			store.dispatch(setUserLoggedOut());
			AppMessage({ content: I18n.t('session.expired'), type: 'info' });
			navigate(getRouteNames(RouteNames.LOGIN), { replace: true });
		} else {
			AppNotification({
				type: 'error',
				message: I18n.t(error.response?.data.message!),
				description:
					typeof error.response?.data.detail === 'object'
						? I18n.t('error.unknown_error')
						: I18n.t(error.response?.data.detail),
			});
		}
	} else {
		AppMessage({ content: I18n.t('error.unknown_error'), type: 'error' });
	}
};
