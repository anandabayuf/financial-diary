import jwt_decode from 'jwt-decode';

export const decodeJWT = (jwt: string, options?: any) => {
	return jwt_decode(jwt, options);
};
