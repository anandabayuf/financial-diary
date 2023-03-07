import { i18n } from 'i18next';
import { TUserResponse } from '../../../../Api/interfaces/types';
export interface MyProfileCardProps {
	user?: TUserResponse;
	I18n?: i18n;
}
