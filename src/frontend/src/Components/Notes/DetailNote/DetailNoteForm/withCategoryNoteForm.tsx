import {
	DetailNoteFormProps,
	DetailNoteFormType,
} from './interfaces/interfaces';
import { useAppSelector } from '../../../../Hooks/useRedux';
import { useState, useEffect } from 'react';
import AppMessage from '../../../General/AppMessage/index';
import { errorHandling } from '../../../../Api/errorHandling';
import { useNavigate } from 'react-router-dom';
import {
	TFetchErrorResponse,
	TCategoryResponse,
	TCategoryNotePayload,
} from '../../../../Api/interfaces/types';
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
		const [availableCategory, setAvailableCategory] = useState<
			TCategoryResponse[]
		>([]);
		const [isLoading, setIsLoading] = useState<boolean>(false);
		const [isFetching, setIsFetching] = useState<boolean>(false);

		const handleSubmit = async (values: DetailNoteFormType) => {
			setIsLoading(true);

			if (token && values && noteId) {
				const payload: TCategoryNotePayload = {
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
					errorHandling(error as TFetchErrorResponse, navigate);
				}
			}

			setIsLoading(false);
		};

		useEffect(() => {
			const getAvailableCategory = async () => {
				setIsFetching(true);

				if (token && noteId) {
					try {
						const res = await getAvailableUserCategory(
							token,
							noteId
						);
						setAvailableCategory(res.data.data);
					} catch (error) {
						errorHandling(error as TFetchErrorResponse, navigate);
						if (token && noteId) {
							try {
								const res = await getAvailableUserCategory(
									token,
									noteId
								);
								setAvailableCategory(res.data.data);
							} catch (error) {
								errorHandling(
									error as TFetchErrorResponse,
									navigate
								);
							}
						}
					}
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
