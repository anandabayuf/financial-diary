import { NoteItemsFormProps, NoteItemFormType } from './interfaces/interfaces';
import { useAppSelector } from '../../../Hooks/useRedux';
import { useState, useEffect } from 'react';
import AppMessage from '../../General/AppMessage';
import { editUserNoteItem } from '../../../Api/NoteItems';
import { getAllUserWalletNote } from '../../../Api/Wallet-Note';
import { getAllUserCategoryNote } from '../../../Api/Category-Note';
import dayjs from 'dayjs';
import { errorHandling } from '../../../Api/errorHandling';
import { useNavigate } from 'react-router-dom';
import {
	TFetchErrorResponse,
	TWalletNoteResponse,
	TCategoryNoteResponse,
} from '../../../Api/interfaces/types';

const withEditNoteItemsForm = (
	Component: React.ComponentType<NoteItemsFormProps>
) => {
	const NewComponent: React.FC<NoteItemsFormProps> = ({
		noteId,
		isWallet,
		isCategory,
		data,
		handleCancel,
		I18n,
		...rest
	}) => {
		const navigate = useNavigate();
		const token = useAppSelector((state) => state.user.accessToken);

		const [isLoading, setIsLoading] = useState(false);
		const [isFetching, setIsFetching] = useState(false);
		const [walletNote, setWalletNote] = useState<TWalletNoteResponse[]>([]);
		const [categoryNote, setCategoryNote] = useState<
			TCategoryNoteResponse[]
		>([]);

		useEffect(() => {
			const getData = async () => {
				setIsFetching(true);

				if (token && I18n && noteId) {
					try {
						const res = await getAllUserWalletNote(token, noteId);
						setWalletNote(res.data.data);
					} catch (error) {
						errorHandling(error as TFetchErrorResponse, navigate);
					}

					try {
						const res = await getAllUserCategoryNote(token, noteId);
						setCategoryNote(res.data.data);
					} catch (error) {
						errorHandling(error as TFetchErrorResponse, navigate);
					}
				}

				setIsFetching(false);
			};

			getData(); //eslint-disable-next-line
		}, []);

		const handleSubmit = async (values: NoteItemFormType) => {
			setIsLoading(true);
			if (values && token) {
				const { type, walletNoteId, categoryNoteId, ...rest } = values;
				let payload: any = {
					...rest,
					date: dayjs(values.date).format('YYYY-MM-DD'),
				};

				if (payload.debit) {
					payload['debit'] = parseInt(payload.debit);
				} else {
					payload['credit'] = parseInt(payload.credit);
				}

				if (data?.type === 1) {
					payload['debit'] = payload.credit;
				}

				try {
					const res = await editUserNoteItem(
						token,
						data?._id!,
						payload
					);
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

		return (
			<Component
				isWallet={isWallet}
				isCategory={isCategory}
				isEdit
				isLoading={isLoading}
				isFetching={isFetching}
				walletNote={walletNote}
				categoryNote={categoryNote}
				data={data}
				handleCancel={handleCancel}
				handleSubmit={handleSubmit}
				I18n={I18n}
				{...rest}
			/>
		);
	};

	return NewComponent;
};

export default withEditNoteItemsForm;
