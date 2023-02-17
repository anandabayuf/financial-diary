import { DetailNoteFormProps } from './interfaces/interfaces';
import { useEffect, useState } from 'react';
import {
	getAvailableUserWallet,
	addWalletToTheNote,
} from '../../../../Api/Wallet-Note';
import { useAppSelector } from '../../../../Hooks/useRedux';
import AppMessage from '../../../General/AppMessage/index';
import { errorHandling } from '../../../../Api/errorHandling';

const withWalletNoteForm = (
	Component: React.ComponentType<DetailNoteFormProps>
) => {
	const NewComponent: React.FC<DetailNoteFormProps> = ({
		noteId,
		handleCancel,
		I18n,
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

			try {
				const res = await addWalletToTheNote(token, payload);
				AppMessage({
					content: I18n?.t(res.data.message),
					type: 'success',
				});
				if (handleCancel) {
					handleCancel();
				}
			} catch (error) {
				errorHandling(error, I18n!);
			}

			setIsLoading(false);
		};

		useEffect(() => {
			const getAvailableWallet = async () => {
				setIsFetching(true);

				try {
					const res = await getAvailableUserWallet(token, noteId);
					setAvailableWallet(res.data.data);
				} catch (error) {
					errorHandling(error, I18n!);
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
				I18n={I18n}
				{...rest}
			/>
		);
	};

	return NewComponent;
};

export default withWalletNoteForm;
