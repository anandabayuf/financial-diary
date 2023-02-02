import { DetailNoteFormProps } from './interfaces/interfaces';
import { useEffect, useState } from 'react';
import {
	getAvailableUserWallet,
	addWalletToTheNote,
} from '../../../../Api/Wallet-Note';
import { useAppSelector } from '../../../../Hooks/useRedux';
import AppMessage from '../../../General/AppMessage/index';

const withWalletNoteForm = (
	Component: React.ComponentType<DetailNoteFormProps>
) => {
	const NewComponent: React.FC<DetailNoteFormProps> = ({
		noteId,
		handleCancel,
		...rest
	}) => {
		const token = useAppSelector((state) => state.user.accessToken);
		const [availableWallet, setAvailableWallet] = useState<any[]>([]);
		const [isLoading, setIsLoading] = useState<boolean>(false);
		const [isFetching, setIsFetching] = useState<boolean>(false);

		const handleSubmit = async (values: any) => {
			setIsLoading(true);
			const payload = {
				walletIds: values.ids,
				noteId,
			};

			const res = await addWalletToTheNote(token, payload);

			if (res.request.status === 201) {
				AppMessage({ content: res.data.message, type: 'success' });
				if (handleCancel) {
					handleCancel();
				}
			} else {
				AppMessage({ content: res.data.message, type: 'error' });
			}

			setIsLoading(false);
		};

		useEffect(() => {
			const getAvailableWallet = async () => {
				setIsFetching(true);

				const res = await getAvailableUserWallet(token, noteId);
				if (res.request.status === 200) {
					setAvailableWallet(res.data.data);
				} else {
					const response = JSON.parse(res.request.response);

					AppMessage({ content: response.message, type: 'error' });
				}

				setIsFetching(false);
			};

			getAvailableWallet(); // eslint-disable-next-line
		}, []);

		return (
			<Component
				isWallet
				handleSubmit={handleSubmit}
				walletData={availableWallet}
				isLoading={isLoading}
				isFetching={isFetching}
				handleCancel={handleCancel}
				{...rest}
			/>
		);
	};

	return NewComponent;
};

export default withWalletNoteForm;
