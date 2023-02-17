import { NoteItemsFormProps } from './interfaces/interfaces';
import { useAppSelector } from '../../../Hooks/useRedux';
import { useState, useEffect } from 'react';
import AppMessage from '../../General/AppMessage';
import { createUserNoteItemByNoteId } from '../../../Api/NoteItems';
import { getAllUserWalletNote } from '../../../Api/Wallet-Note';
import { getAllUserCategoryNote } from '../../../Api/Category-Note';
import { ITEM_TYPE } from '../../../Constants/Constants';
import { DatePickerProps } from 'antd';
import { errorHandling } from '../../../Api/errorHandling';

const withCreateNoteItemsForm = (
	Component: React.ComponentType<NoteItemsFormProps>
) => {
	const NewComponent: React.FC<NoteItemsFormProps> = ({
		noteId,
		isWallet,
		isCategory,
		handleCancel,
		I18n,
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

				try {
					const res = await getAllUserWalletNote(token, noteId);
					setWalletNote(res.data.data);
				} catch (error) {}

				try {
					const res = await getAllUserCategoryNote(token, noteId);
					setCategoryNote(res.data.data);
				} catch (error) {
					errorHandling(error, I18n!);
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
			try {
				const res = await createUserNoteItemByNoteId(
					token,
					noteId,
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
				errorHandling(error, I18n!);
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
				I18n={I18n}
				{...rest}
			/>
		);
	};

	return NewComponent;
};

export default withCreateNoteItemsForm;
