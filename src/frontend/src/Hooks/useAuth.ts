import { authToken } from '../Api/Auth';
import { useAppSelector } from './useRedux';
import { useMemo } from 'react';
import { errorHandling } from '../Api/errorHandling';
import { useNavigate } from 'react-router-dom';
import I18n from 'i18next';
import { TFetchErrorResponse } from '../Api/interfaces/types';

const useAuth = () => {
	const user = useAppSelector((state) => state.user);
	const navigate = useNavigate();

	useMemo(() => {
		const checkTokenValidation = async () => {
			if (user.accessToken) {
				try {
					await authToken(`${user.accessToken}`);
				} catch (error) {
					errorHandling(error as TFetchErrorResponse, navigate);
				}
			}
		};

		checkTokenValidation(); // eslint-disable-next-line
	}, []);

	return user && user.accessToken && user.isLoggedIn;
};

export default useAuth;
