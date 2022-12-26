export interface LoginFormProps {
	handleFinish?: (values: any) => void;
	handleFinishFailed?: (errorInfo: any) => void;
	loading?: boolean;
}
