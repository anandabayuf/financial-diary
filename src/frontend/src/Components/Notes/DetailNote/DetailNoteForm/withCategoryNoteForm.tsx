import { DetailNoteFormProps } from './interfaces/interfaces';
import { useAppSelector } from '../../../../Hooks/useRedux';
import { useState, useEffect } from 'react';
import AppMessage from '../../../General/AppMessage/index';
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
		...rest
	}) => {
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

			const res = await addCategoryToTheNote(token, payload);

			if (res.request.status === 201) {
				AppMessage({ content: res.data.message, type: 'success' });
				if (handleCancel) {
					handleCancel();
				}
			} else {
				AppMessage({ content: res.data.message, type: 'error' });
			}

			setIsLoading(false);
		};

		useEffect(() => {
			const getAvailableCategory = async () => {
				setIsFetching(true);

				const res = await getAvailableUserCategory(token, noteId);
				if (res.request.status === 200) {
					setAvailableCategory(res.data.data);
				} else {
					const response = JSON.parse(res.request.response);

					AppMessage({ content: response.message, type: 'error' });
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
				{...rest}
			/>
		);
	};

	return NewComponent;
};

export default withCategoryNoteForm;
