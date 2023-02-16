import { AxiosError } from 'axios';
import AppNotification from '../Components/General/AppNotification/index';
import AppMessage from '../Components/General/AppMessage/index';
import { NavigateFunction } from 'react-router-dom';
import { setUserLoggedOut } from '../Store/User/UserSlice';
import { AnyAction, Dispatch } from 'redux';
import { i18n } from 'i18next';

export const errorHandling = (
	error: any,
	I18n: i18n,
	dispatch?: Dispatch<AnyAction>,
	navigate?: NavigateFunction
) => {
	if (error instanceof AxiosError) {
		if (error.code === 'ERR_NETWORK') {
			AppMessage({
				content: I18n.t(`network.${error.code}`),
				type: 'error',
			});
		} else if (error.request.status === 401 && dispatch && navigate) {
			dispatch(setUserLoggedOut());
			AppMessage({ content: I18n.t('session.expired'), type: 'info' });
			navigate('/login', {
				replace: true,
			});
		} else {
			AppNotification({
				type: 'error',
				message: I18n.t(error.response?.data.message),
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
