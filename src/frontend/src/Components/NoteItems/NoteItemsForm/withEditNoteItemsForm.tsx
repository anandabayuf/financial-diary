import { NoteItemsFormProps } from './interfaces/interfaces';
import { useAppSelector } from '../../../Hooks/useRedux';
import { useState, useEffect } from 'react';
import AppMessage from '../../General/AppMessage';
import {
	createUserNoteItemByNoteId,
	editUserNoteItem,
} from '../../../Api/NoteItems';
import { getAllUserWalletNote } from '../../../Api/Wallet-Note';
import { getAllUserCategoryNote } from '../../../Api/Category-Note';
import { ITEM_TYPE } from '../../../Constants/Constants';
import { DatePickerProps } from 'antd';
import dayjs from 'dayjs';

const withEditNoteItemsForm = (
	Component: React.ComponentType<NoteItemsFormProps>
) => {
	const NewComponent: React.FC<NoteItemsFormProps> = ({
		noteId,
		isWallet,
		isCategory,
		data,
		handleCancel,
		...rest
	}) => {
		const token = useAppSelector((state) => state.user.accessToken);
		const { selectedCategoryNote, selectedWalletNote } = useAppSelector(
			(state) => state.note
		);

		const [isLoading, setIsLoading] = useState(false);
		const [isFetching, setIsFetching] = useState(false);
		const [walletNote, setWalletNote] = useState<any[]>([]);
		const [categoryNote, setCategoryNote] = useState<any[]>([]);

		useEffect(() => {
			const getData = async () => {
				setIsFetching(true);

				let res = await getAllUserWalletNote(token, noteId);
				if (res.request.status === 200) {
					setWalletNote(res.data.data);
				} else {
					AppMessage({ content: '', type: 'error' });
				}

				res = await getAllUserCategoryNote(token, noteId);
				if (res.request.status === 200) {
					setCategoryNote(res.data.data);
				} else {
					AppMessage({ content: '', type: 'error' });
				}

				setIsFetching(false);
			};

			getData(); //eslint-disable-next-line
		}, []);

		const handleSubmit = async (values: any) => {
			setIsLoading(true);
			const { type, walletNoteId, categoryNoteId, ...rest } = values;
			let payload = {
				...rest,
				date: dayjs(values.date).format('YYYY-MM-DD'),
			};

			if (payload.debit) {
				payload['debit'] = parseInt(payload.debit);
			} else {
				payload['credit'] = parseInt(payload.credit);
			}

			if (data.type === 1) {
				payload['debit'] = payload.credit;
			}

			const res = await editUserNoteItem(token, data._id, payload);
			if (res.request.status === 201) {
				AppMessage({ content: res.data.message, type: 'success' });
				if (handleCancel) {
					handleCancel();
				}
			} else {
				AppMessage({
					content: `${res.response.data.message} - ${res.response.data.detail}`,
					type: 'error',
				});
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
				{...rest}
			/>
		);
	};

	return NewComponent;
};

export default withEditNoteItemsForm;
