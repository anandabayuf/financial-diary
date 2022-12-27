import { useAppSelector } from './useRedux';
import { useState, useMemo } from 'react';
import { getUserById } from '../Api/User';

const useUserInfo = () => {
	const user = useAppSelector((state) => state.user);
	const [userInfo, setUserInfo] = useState<any>();

	useMemo(() => {
		const getUser = async () => {
			const res = await getUserById(user.data.id, `${user.accessToken}`);
			if (res.request.status === 200) {
				setUserInfo(res.data.data);
			}
		};

		getUser();
	}, [user]);

	return userInfo;
};

export default useUserInfo;
