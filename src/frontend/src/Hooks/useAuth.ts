import { checkToken } from '../Api/Auth';
import { useAppSelector, useAppDispatch } from './useRedux';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUserLoggedOut } from '../Store/User/UserSlice';

const useAuth = () => {
	const user = useAppSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useMemo(() => {
		const checkTokenValidation = async () => {
			if (user.accessToken) {
				const res = await checkToken(`${user.accessToken}`);
				if (res.request.status === 401) {
					dispatch(setUserLoggedOut());

					navigate('/login', {
						state: {
							message: 'Session has expired, please log in again',
						},
						replace: true,
					});
				}
			}
		};

		checkTokenValidation(); // eslint-disable-next-line
	}, []);

	return user && user.isLoggedIn;
};

export default useAuth;
