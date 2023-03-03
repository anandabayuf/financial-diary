import { checkToken } from '../Api/Auth';
import { useAppSelector, useAppDispatch } from './useRedux';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { errorHandling } from '../Api/errorHandling';
import I18n from 'i18next';

const useAuth = () => {
	const user = useAppSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useMemo(() => {
		const checkTokenValidation = async () => {
			if (user.accessToken) {
				try {
					await checkToken(`${user.accessToken}`);
				} catch (error) {
					errorHandling(error, I18n, dispatch, navigate);
				}
			}
		};

		checkTokenValidation(); // eslint-disable-next-line
	}, []);

	return user && user.accessToken && user.isLoggedIn;
};

export default useAuth;
