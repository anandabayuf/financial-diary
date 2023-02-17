import { useState } from 'react';
import { editWalletNoteEstimated } from '../../../../Api/Wallet-Note';
import { useAppSelector } from '../../../../Hooks/useRedux';
import AppMessage from '../../../General/AppMessage/index';
import { editCategoryNoteEstimated } from '../../../../Api/Category-Note';
import { EstimationNoteFormProps } from './interfaces/interfaces';
import { errorHandling } from '../../../../Api/errorHandling';

const withEditEstimationNoteForm = (
	Component: React.ComponentType<EstimationNoteFormProps>
) => {
	const NewComponent: React.FC<EstimationNoteFormProps> = ({
		noteId,
		data,
		handleCancel,
		I18n,
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
				if (values.estimatedBalance !== undefined) {
					const payload = {
						noteId: noteId,
						estimated: {
							balance: parseInt(values.estimatedBalance),
						},
					};

					try {
						const res = await editWalletNoteEstimated(
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
						errorHandling(error, I18n!);
					}
				} else if (values.estimatedTotal !== undefined) {
					const payload = {
						noteId: noteId,
						estimated: {
							total: parseInt(values.estimatedTotal),
						},
					};
					try {
						const res = await editCategoryNoteEstimated(
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
						errorHandling(error, I18n!);
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

export default withEditEstimationNoteForm;
