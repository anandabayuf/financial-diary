import { TLoginPayload } from '../../../../Api/interfaces/types';
export interface LoginFormProps {
	handleFinish?: (values: TLoginPayload) => void;
	loading?: boolean;
}
