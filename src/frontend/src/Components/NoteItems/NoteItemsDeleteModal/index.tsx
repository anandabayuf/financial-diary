import { NoteItemsDeleteModalProps } from './interfaces/interfaces';
import AppModal from '../../General/AppModal/index';
import AppTitle from '../../General/AppTitle/index';
import AppText from '../../General/AppText/index';
import dayjs from 'dayjs';
import { formatIDR } from '../../../Utils/CurrencyUtils';
import AppButton from '../../General/AppButton/index';
import AppLoader from '../../General/AppLoader';
import { ITEM_TYPE } from '../../../Constants/Constants';
import { useAppSelector } from '../../../Hooks/useRedux';

const NoteItemsDeleteModal: React.FC<NoteItemsDeleteModalProps> = ({
	deletedData,
	isCategory,
	isLoading,
	isModalDeleteOpen,
	I18n,
	handleCancelDelete,
	handleDelete,
}) => {
	const walletNoteId = useAppSelector(
		(state) => state.note.selectedWalletNote?.id
	);

	return (
		<AppModal
			title={
				<AppTitle
					title={I18n?.t('title.note.item.delete')}
					level={4}
				/>
			}
			open={isModalDeleteOpen}
			closable={true}
			onCancel={handleCancelDelete}
		>
			<div>
				<div className='mb-3'>
					<AppText
						text={I18n?.t('content.note_item_delete_confirmation')}
					/>
				</div>
				<div className='flex justify-center'>
					<div className='w-[400px]'>
						<div className='flex justify-between gap-x-3 mb-2'>
							<AppText text={`${I18n?.t('content.date')}: `} />
							<AppText
								text={dayjs(deletedData.date).format(
									'DD-MMM-YYYY'
								)}
							/>
						</div>
						<div className='flex justify-between gap-x-3 mb-2'>
							<AppText
								text={`${I18n?.t('content.description')}: `}
							/>
							<AppText text={deletedData.description} />
						</div>
						{!isCategory && (
							<div className='flex justify-between gap-x-3 mb-2'>
								<AppText
									text={`${I18n?.t('content.debit')}: `}
								/>
								<AppText
									text={formatIDR(
										ITEM_TYPE[deletedData.type] ===
											'Transfer or Withdraw'
											? walletNoteId ===
											  deletedData.walletNoteId
												? 0
												: deletedData.debit
											: deletedData.debit
									)}
								/>
							</div>
						)}
						<div className='flex justify-between gap-x-3'>
							<AppText text={`${I18n?.t('content.credit')}: `} />
							<AppText
								text={formatIDR(
									ITEM_TYPE[deletedData.type] ===
										'Transfer or Withdraw'
										? walletNoteId ===
										  deletedData.walletNoteId2
											? 0
											: deletedData.credit
										: deletedData.credit
								)}
							/>
						</div>
						{isLoading ? (
							<AppLoader />
						) : (
							<div className='flex justify-center mt-8 gap-x-4'>
								<AppButton
									type='text'
									onClick={handleCancelDelete}
								>
									{I18n?.t('label.cancel')}
								</AppButton>
								<AppButton
									danger
									type='text'
									onClick={handleDelete}
								>
									{I18n?.t('label.delete')}
								</AppButton>
							</div>
						)}
					</div>
				</div>
			</div>
		</AppModal>
	);
};

export default NoteItemsDeleteModal;
