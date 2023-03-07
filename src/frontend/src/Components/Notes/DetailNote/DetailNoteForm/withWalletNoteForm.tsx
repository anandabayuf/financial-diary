import {
	DetailNoteFormProps,
	DetailNoteFormType,
} from './interfaces/interfaces';
import { useEffect, useState } from 'react';
import {
	getAvailableUserWallet,
	addWalletToTheNote,
} from '../../../../Api/Wallet-Note';
import { useAppSelector } from '../../../../Hooks/useRedux';
import AppMessage from '../../../General/AppMessage/index';
import { errorHandling } from '../../../../Api/errorHandling';
import { useNavigate } from 'react-router-dom';
import {
	TFetchErrorResponse,
	TWalletResponse,
} from '../../../../Api/interfaces/types';

const withWalletNoteForm = (
	Component: React.ComponentType<DetailNoteFormProps>
) => {
	const NewComponent: React.FC<DetailNoteFormProps> = ({
		noteId,
		handleCancel,
		I18n,
		...rest
	}) => {
		const navigate = useNavigate();
		const token = useAppSelector((state) => state.user.accessToken);
		const [availableWallet, setAvailableWallet] = useState<
			TWalletResponse[]
		>([]);
		const [isLoading, setIsLoading] = useState<boolean>(false);
		const [isFetching, setIsFetching] = useState<boolean>(false);

		const handleSubmit = async (values: DetailNoteFormType) => {
			setIsLoading(true);

			if (token && values && noteId) {
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
					errorHandling(error as TFetchErrorResponse, navigate);
				}
			}

			setIsLoading(false);
		};

		useEffect(() => {
			const getAvailableWallet = async () => {
				setIsFetching(true);

				if (token && noteId) {
					try {
						const res = await getAvailableUserWallet(token, noteId);
						setAvailableWallet(res.data.data);
					} catch (error) {
						errorHandling(error as TFetchErrorResponse, navigate);
					}
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
