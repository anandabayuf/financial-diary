import { useState } from 'react';
import { editWalletNoteBudget } from '../../../../Api/Wallet-Note';
import { useAppSelector } from '../../../../Hooks/useRedux';
import AppMessage from '../../../General/AppMessage/index';
import { editCategoryNoteBudget } from '../../../../Api/Category-Note';
import { BudgetNoteFormProps } from './interfaces/interfaces';
import { errorHandling } from '../../../../Api/errorHandling';
import { useNavigate } from 'react-router-dom';
import {
	TFetchErrorResponse,
	TEditWalletNotePayload,
} from '../../../../Api/interfaces/types';

const withEditBudgetNoteForm = (
	Component: React.ComponentType<BudgetNoteFormProps>
) => {
	const NewComponent: React.FC<BudgetNoteFormProps> = ({
		noteId,
		data,
		handleCancel,
		I18n,
		...rest
	}) => {
		const navigate = useNavigate();
		const token = useAppSelector((state) => state.user.accessToken);
		const [isLoading, setIsLoading] = useState<boolean>(false);

		const handleSubmit = async (values: any) => {
			setIsLoading(true);

			if (
				values &&
				((values.estimatedBalance !== undefined &&
					parseInt(values.estimatedBalance) !==
						data.estimated.balance) ||
					(values.estimatedTotal !== undefined &&
						parseInt(values.estimatedTotal) !==
							data.estimated.total))
			) {
				if (values.estimatedBalance !== undefined && token && noteId) {
					const payload: TEditWalletNotePayload = {
						noteId,
						estimated: {
							balance: parseInt(values.estimatedBalance),
						},
					};

					try {
						const res = await editWalletNoteBudget(
							token,
							data._id,
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
				} else if (
					values.estimatedTotal !== undefined &&
					token &&
					noteId
				) {
					const payload = {
						noteId: noteId,
						estimated: {
							total: parseInt(values.estimatedTotal),
						},
					};
					try {
						const res = await editCategoryNoteBudget(
							token,
							data._id,
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
			} else {
				if (handleCancel) {
					handleCancel();
				}
			}

			setIsLoading(false);
		};

		return (
			<Component
				data={data}
				isEdit
				isLoading={isLoading}
				handleSubmit={handleSubmit}
				handleCancel={handleCancel}
				I18n={I18n}
				{...rest}
			/>
		);
	};

	return NewComponent;
};

export default withEditBudgetNoteForm;
