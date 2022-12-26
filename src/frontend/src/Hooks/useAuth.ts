import { useAppSelector } from './useRedux';

const useAuth = () => {
	const user = useAppSelector((state) => state.user);

	return user && user.isLoggedIn;
};

export default useAuth;
