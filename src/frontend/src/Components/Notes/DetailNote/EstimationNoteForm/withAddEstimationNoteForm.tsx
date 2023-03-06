import { useEffect, useState } from 'react';
import { getAvailableUserWallet } from '../../../../Api/Wallet-Note';
import { useAppSelector } from '../../../../Hooks/useRedux';
import AppMessage from '../../../General/AppMessage/index';
import {
	getAvailableUserCategory,
	addCategoryNoteEstimated,
} from '../../../../Api/Category-Note';
import { addWalletNoteEstimated } from '../../../../Api/Wallet-Note';
import { EstimationNoteFormProps } from './interfaces/interfaces';
import { errorHandling } from '../../../../Api/errorHandling';
import { useNavigate } from 'react-router-dom';

const withAddEstimationNoteForm = (
	Component: React.ComponentType<EstimationNoteFormProps>
) => {
	const NewComponent: React.FC<EstimationNoteFormProps> = ({
		noteId,
		handleCancel,
		I18n,
		...rest
	}) => {
		const navigate = useNavigate();
		const token = useAppSelector((state) => state.user.accessToken);
		const [availableWallet, setAvailableWallet] = useState<any[]>([]);
		const [availableCategory, setAvailableCategory] = useState<any[]>([]);
		const [isLoading, setIsLoading] = useState<boolean>(false);
		const [isFetching, setIsFetching] = useState<boolean>(false);

		useEffect(() => {
			const getAvailableWalletAndCategory = async () => {
				setIsFetching(true);

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
					} catch (error) {}
				} catch (error) {
					errorHandling(error, navigate);
				}

				setIsFetching(false);
			};

			getAvailableWalletAndCategory(); // eslint-disable-next-line
		}, []);

		const handleSubmit = async (values: any) => {
			setIsLoading(true);
			if (values && (values.wallets || values.categories)) {
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
						errorHandling(error, navigate);
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
						errorHandling(error, navigate);
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
