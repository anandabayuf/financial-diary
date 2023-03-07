import jwt_decode, { JwtDecodeOptions } from 'jwt-decode';
import crypto from 'crypto';
import { PUBLIC_KEY } from '../Constants/Constants';
import { TCheckTokenResponse } from '../Api/interfaces/types';

export const decodeJWT = (
	jwt: string,
	options?: JwtDecodeOptions
): TCheckTokenResponse => {
	return jwt_decode(jwt, options);
};

export const encryptPassword = (password: string): string => {
	try {
		const encryptedData = crypto.publicEncrypt(
			PUBLIC_KEY,
			Buffer.from(password)
		);

		return encryptedData.toString('base64');
	} catch (error) {
		throw new Error('Cannot encrypt Password');
	}
};
