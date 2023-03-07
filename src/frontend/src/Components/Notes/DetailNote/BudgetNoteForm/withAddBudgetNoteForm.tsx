import { useEffect, useState } from 'react';
import { getAvailableUserWallet } from '../../../../Api/Wallet-Note';
import { useAppSelector } from '../../../../Hooks/useRedux';
import AppMessage from '../../../General/AppMessage/index';
import {
	getAvailableUserCategory,
	addCategoryNoteEstimated,
} from '../../../../Api/Category-Note';
import { addWalletNoteEstimated } from '../../../../Api/Wallet-Note';
import { BudgetNoteFormProps } from './interfaces/interfaces';
import { errorHandling } from '../../../../Api/errorHandling';
import { useNavigate } from 'react-router-dom';
import {
	TFetchErrorResponse,
	TWalletResponse,
	TCategoryResponse,
} from '../../../../Api/interfaces/types';

const withAddEstimationNoteForm = (
	Component: React.ComponentType<BudgetNoteFormProps>
) => {
	const NewComponent: React.FC<BudgetNoteFormProps> = ({
		noteId,
		handleCancel,
		I18n,
		...rest
	}) => {
		const navigate = useNavigate();
		const token = useAppSelector((state) => state.user.accessToken);
		const [availableWallet, setAvailableWallet] = useState<
			TWalletResponse[]
		>([]);
		const [availableCategory, setAvailableCategory] = useState<
			TCategoryResponse[]
		>([]);
		const [isLoading, setIsLoading] = useState<boolean>(false);
		const [isFetching, setIsFetching] = useState<boolean>(false);

		useEffect(() => {
			const getAvailableWalletAndCategory = async () => {
				setIsFetching(true);

				if (token && noteId) {
					try {
						const resWallet = await getAvailableUserWallet(
							token,
							noteId
						);
						try {
							const resCat = await getAvailableUserCategory(
								token,
								noteId
							);

							setAvailableWallet(resWallet.data.data);
							setAvailableCategory(resCat.data.data);
						} catch (error) {
							errorHandling(
								error as TFetchErrorResponse,
								navigate
							);
						}
					} catch (error) {
						errorHandling(error as TFetchErrorResponse, navigate);
					}
				}

				setIsFetching(false);
			};

			getAvailableWalletAndCategory(); // eslint-disable-next-line
		}, []);

		const handleSubmit = async (values: any) => {
			setIsLoading(true);
			if (values && (values.wallets || values.categories) && token) {
				if (values.wallets && values.wallets.length > 0) {
					const walletsPayload = values.wallets.map((wallet: any) => {
						return {
							walletId: wallet.walletId.value,
							noteId,
							estimated: {
								balance: parseInt(wallet.estimatedBalance),
							},
						};
					});

					try {
						const res = await addWalletNoteEstimated(
							token,
							walletsPayload
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

				if (values.categories && values.categories.length > 0) {
					const categoriesPayload = values.categories.map(
						(category: any) => {
							return {
								categoryId: category.categoryId.value,
								noteId,
								estimated: {
									total: parseInt(category.estimatedTotal),
								},
							};
						}
					);

					try {
						const res = await addCategoryNoteEstimated(
							token,
							categoriesPayload
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
			}

			setIsLoading(false);
		};

		return (
			<Component
				isAdd
				handleSubmit={handleSubmit}
				walletData={availableWallet}
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

export default withAddEstimationNoteForm;
