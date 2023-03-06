import { DetailNoteFormProps } from './interfaces/interfaces';
import { useAppSelector } from '../../../../Hooks/useRedux';
import { useState, useEffect } from 'react';
import AppMessage from '../../../General/AppMessage/index';
import { errorHandling } from '../../../../Api/errorHandling';
import { useNavigate } from 'react-router-dom';
import {
	getAvailableUserCategory,
	addCategoryToTheNote,
} from '../../../../Api/Category-Note';

const withCategoryNoteForm = (
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
		const [availableCategory, setAvailableCategory] = useState<any[]>([]);
		const [isLoading, setIsLoading] = useState<boolean>(false);
		const [isFetching, setIsFetching] = useState<boolean>(false);

		const handleSubmit = async (values: any) => {
			setIsLoading(true);
			const payload = {
				categoryIds: values.ids,
				noteId,
			};

			try {
				const res = await addCategoryToTheNote(token, payload);
				AppMessage({
					content: I18n?.t(res.data.message),
					type: 'success',
				});
				if (handleCancel) {
					handleCancel();
				}
			} catch (error) {
				errorHandling(error, navigate);
			}

			setIsLoading(false);
		};

		useEffect(() => {
			const getAvailableCategory = async () => {
				setIsFetching(true);

				try {
					const res = await getAvailableUserCategory(token, noteId);
					setAvailableCategory(res.data.data);
				} catch (error) {
					errorHandling(error, navigate);
				}

				setIsFetching(false);
			};

			getAvailableCategory(); // eslint-disable-next-line
		}, []);

		return (
			<Component
				isCategory
				handleSubmit={handleSubmit}
				categoryData={availableCategory}
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

export default withCategoryNoteForm;
