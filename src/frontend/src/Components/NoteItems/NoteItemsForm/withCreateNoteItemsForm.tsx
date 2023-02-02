import { NoteItemsFormProps } from './interfaces/interfaces';
import { useAppSelector } from '../../../Hooks/useRedux';
import { useState, useEffect } from 'react';
import AppMessage from '../../General/AppMessage';
import { createUserNoteItemByNoteId } from '../../../Api/NoteItems';
import { getAllUserWalletNote } from '../../../Api/Wallet-Note';
import { getAllUserCategoryNote } from '../../../Api/Category-Note';
import { ITEM_TYPE } from '../../../Constants/Constants';
import { DatePickerProps } from 'antd';

const withCreateNoteItemsForm = (
	Component: React.ComponentType<NoteItemsFormProps>
) => {
	const NewComponent: React.FC<NoteItemsFormProps> = ({
		noteId,
		isWallet,
		isCategory,
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
		const [selectedDate, setSelectedDate] = useState<string>('');

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

		const handleChangeDatePicker: DatePickerProps['onChange'] = (
			value,
			dateString
		) => {
			setSelectedDate(dateString);
		};

		const handleSubmit = async (values: any) => {
			setIsLoading(true);

			let payload = {
				...values,
				type: ITEM_TYPE.findIndex((el) => el === values.type),
				date: selectedDate,
			};

			if (payload.debit) {
				payload['debit'] = parseInt(payload.debit);
			} else {
				payload['credit'] = parseInt(payload.credit);
			}

			if (isCategory) {
				payload['categoryNoteId'] = selectedCategoryNote?.id;
			} else {
				if (payload.type === 1) {
					const walletNoteId2 = payload.walletNoteId;
					payload['walletNoteId2'] = walletNoteId2;
					payload['debit'] = payload.credit;
				}

				payload['walletNoteId'] = selectedWalletNote?.id;
			}

			// console.log(payload);

			const res = await createUserNoteItemByNoteId(
				token,
				noteId,
				payload
			);
			// console.log(res);
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
				isCreate
				isLoading={isLoading}
				isFetching={isFetching}
				walletNote={walletNote}
				categoryNote={categoryNote}
				handleChangeDatePicker={handleChangeDatePicker}
				handleCancel={handleCancel}
				handleSubmit={handleSubmit}
				{...rest}
			/>
		);
	};

	return NewComponent;
};

export default withCreateNoteItemsForm;
