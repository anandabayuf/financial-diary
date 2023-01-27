import { useState } from 'react';
import { editWalletNoteEstimated } from '../../../../Api/Wallet-Note';
import { useAppSelector } from '../../../../Hooks/useRedux';
import AppMessage from '../../../General/AppMessage/index';
import { editCategoryNoteEstimated } from '../../../../Api/Category-Note';
import { EstimationNoteFormProps } from './interfaces/interfaces';

const withEditEstimationNoteForm = (
	Component: React.ComponentType<EstimationNoteFormProps>
) => {
	const NewComponent: React.FC<EstimationNoteFormProps> = ({
		noteId,
		data,
		handleCancel,
		...rest
	}) => {
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
				let res: any;

				if (values.estimatedBalance !== undefined) {
					const payload = {
						noteId: noteId,
						estimated: {
							balance: parseInt(values.estimatedBalance),
						},
					};
					res = await editWalletNoteEstimated(
						token,
						data._id,
						payload
					);
				} else if (values.estimatedTotal !== undefined) {
					const payload = {
						noteId: noteId,
						estimated: {
							total: parseInt(values.estimatedTotal),
						},
					};
					res = await editCategoryNoteEstimated(
						token,
						data._id,
						payload
					);
				}

				if (res.request.status === 201) {
					AppMessage({
						content: res.data.message,
						type: 'success',
					});
					if (handleCancel) {
						handleCancel();
					}
				} else {
					AppMessage({
						content: res.data.message,
						type: 'error',
					});
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
				{...rest}
			/>
		);
	};

	return NewComponent;
};

export default withEditEstimationNoteForm;
