import { NoteItemsFormProps } from './interfaces/interfaces';
import AppFormItem from '../../General/AppFormItem/index';
import AppSelect from '../../General/AppSelect';
import { SelectProps, Form, DatePickerProps } from 'antd';
import { ITEM_TYPE } from '../../../Constants/Constants';
import AppButton from '../../General/AppButton';
import AppLoader from '../../General/AppLoader';
import AppInput from '../../General/AppInput/index';
import AppText from '../../General/AppText';
import { useAppSelector } from '../../../Hooks/useRedux';
import AppTooltip from '../../General/AppTooltip';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import useTheme from '../../../Hooks/useTheme';
import AppDatePicker from '../../General/AppDatePicker/index';
import dayjs from 'dayjs';

const NoteItemsForm: React.FC<NoteItemsFormProps> = ({
	isWallet,
	isCategory,
	isCreate,
	isEdit,
	isLoading,
	isFetching,
	data,
	walletNote,
	categoryNote,
	I18n,
	handleSubmit,
	handleCancel,
}) => {
	const selectedWalletNoteId = useAppSelector(
		(state) => state.note.selectedWalletNote?.id
	);
	const { month, year } = useAppSelector((state) => state.note.selectedNote!);

	const { color } = useTheme();

	const ItemTypeOptions: SelectProps['options'] = ITEM_TYPE.filter((el) =>
		isCategory
			? el !== 'Income' &&
			  el !== 'Spend Only In Wallet' &&
			  el !== 'Transfer or Withdraw'
			: el
	).map((el) => {
		return {
			label: I18n?.t(`label.${el}`),
			value: el,
		};
	});

	const walletNoteOptions: SelectProps['options'] =
		!isEdit && isWallet
			? walletNote
					?.filter((el) => el._id !== selectedWalletNoteId)
					.map((walletNote) => {
						return {
							label: walletNote.wallet.name,
							value: walletNote._id,
						};
					})
			: walletNote?.map((walletNote) => {
					return {
						label: walletNote.wallet.name,
						value: walletNote._id,
					};
			  });

	const categoryNoteOptions: SelectProps['options'] = categoryNote?.map(
		(catNote) => {
			return {
				label: catNote.category.name,
				value: catNote._id,
			};
		}
	);

	const initialValues = () => {
		if (!isEdit && isCategory) {
			return {
				date: dayjs(new Date(Date.now())),
				type: 'Spend',
			};
		}

		if (isEdit) {
			return {
				...data,
				date: dayjs(data?.date),
				type: ITEM_TYPE[data?.type!],
				walletNoteId:
					selectedWalletNoteId === data?.walletNoteId2 &&
					data?.type === 1
						? data.walletNoteId
						: data?.type === 1
						? data.walletNoteId2
						: data?.walletNoteId,
			};
		}

		return { date: dayjs(new Date(Date.now())) };
	};

	const disabledDate: DatePickerProps['disabledDate'] = (date) => {
		const noteMonth = parseInt(month!);
		const noteYear = parseInt(year!);
		if (noteMonth - 1 === 0) {
			return (
				date &&
				(date.valueOf() <=
					new Date(`${noteYear - 1}-12-26`).getTime() ||
					date.valueOf() >=
						new Date(`${noteYear}-${noteMonth}-26`).getTime())
			);
		} else {
			return (
				date &&
				(date.valueOf() <=
					new Date(`${noteYear}-${noteMonth - 1}-26`).getTime() ||
					date.valueOf() >=
						new Date(`${noteYear}-${noteMonth}-26`).getTime())
			);
		}
	};

	return isFetching ? (
		<AppLoader />
	) : (
		<Form
			autoComplete='on'
			layout='vertical'
			initialValues={initialValues()}
			onFinish={handleSubmit}
		>
			<AppFormItem
				label={I18n?.t('form.label.date')}
				name='date'
				rules={[
					{
						required: true,
						message: I18n?.t('form.required.date')!,
					},
				]}
			>
				<AppDatePicker
					placeholder={I18n?.t('form.placeholder.date')}
					picker='date'
					disabledDate={disabledDate}
				/>
			</AppFormItem>
			<AppFormItem
				label={I18n?.t('form.label.description')}
				name='description'
				rules={[
					{
						required: true,
						message: I18n?.t('form.required.description')!,
					},
				]}
			>
				<AppInput
					placeholder={I18n?.t('form.placeholder.description')}
				/>
			</AppFormItem>
			<AppFormItem
				label={I18n?.t('form.label.item_type')}
				name='type'
				className='mb-1'
				rules={[
					{
						required: true,
						message: I18n?.t('form.required.item_type')!,
					},
				]}
			>
				<AppSelect
					placeholder={I18n?.t('form.placeholder.item_type')}
					options={ItemTypeOptions}
					disabled={isEdit}
					showSearch
				/>
			</AppFormItem>
			<Form.Item
				noStyle
				shouldUpdate={(prevValues, currentValues) =>
					prevValues.type !== currentValues.type
				}
			>
				{({ getFieldValue }) =>
					getFieldValue('type') !== undefined && (
						<>
							<AppTooltip
								title={I18n?.t(
									`content.what_is.${getFieldValue('type')}`
								)}
								trigger={'click'}
								placement='topLeft'
							>
								<div className='flex justify-start items-center gap-x-2 mb-[24px]'>
									<AppText
										text={`${I18n?.t(
											'content.what_is'
										)} ${I18n?.t(
											`label.${getFieldValue('type')}`
										)}?`}
										className='text-sm'
									/>
									<AiOutlineQuestionCircle
										color={color?.text}
									/>
								</div>
							</AppTooltip>
						</>
					)
				}
			</Form.Item>
			<Form.Item
				noStyle
				shouldUpdate={(prevValues, currentValues) =>
					prevValues.type !== currentValues.type
				}
			>
				{({ getFieldValue }) =>
					getFieldValue('type') === 'Income' ||
					getFieldValue('type') === 'Spend' ||
					getFieldValue('type') === 'Spend Only In Wallet' ? (
						<>
							{!isCategory &&
								getFieldValue('type') !==
									'Spend Only In Wallet' &&
								getFieldValue('type') !== 'Income' && (
									<AppFormItem
										name={'categoryNoteId'}
										label={I18n?.t('form.label.category')}
										rules={[
											{
												required: true,
												message: I18n?.t(
													'form.required.category'
												)!,
											},
										]}
									>
										<AppSelect
											placeholder={I18n?.t(
												'form.placeholder.category'
											)}
											options={categoryNoteOptions}
											disabled={isEdit}
											showSearch
										/>
									</AppFormItem>
								)}
							{isCategory && (
								<AppFormItem
									name={'walletNoteId'}
									label={I18n?.t('form.label.spend_wallet')}
									rules={[
										{
											required: true,
											message: I18n?.t(
												'form.required.wallet'
											)!,
										},
									]}
								>
									<AppSelect
										placeholder={I18n?.t(
											'form.placeholder.wallet'
										)}
										options={walletNoteOptions}
										disabled={isEdit}
										showSearch
									/>
								</AppFormItem>
							)}
							<AppFormItem
								name={
									getFieldValue('type') === 'Income'
										? 'debit'
										: 'credit'
								}
								label={
									getFieldValue('type') === 'Income'
										? I18n?.t('form.label.income_amount')
										: I18n?.t('form.label.spend_amount')
								}
								rules={[
									{
										required: true,
										message:
											getFieldValue('type') === 'Income'
												? I18n?.t(
														'form.required.income_amount'
												  )!
												: I18n?.t(
														'form.required.spend_amount'
												  )!,
									},
									{
										pattern: /^[0-9]*$/,
										message: I18n?.t(
											'form.validation.only_number'
										)!,
									},
								]}
							>
								<AppInput
									placeholder={
										getFieldValue('type') === 'Income'
											? I18n?.t(
													'form.placeholder.income_amount'
											  )
											: I18n?.t(
													'form.placeholder.spend_amount'
											  )
									}
								/>
							</AppFormItem>
						</>
					) : getFieldValue('type') === 'Transfer or Withdraw' ? (
						<>
							<AppFormItem
								name={'walletNoteId'}
								label={
									isEdit &&
									selectedWalletNoteId === data?.walletNoteId2
										? I18n?.t('form.label.transfer_from')
										: I18n?.t('form.label.transfer_to')
								}
								rules={[
									{
										required: true,
										message: I18n?.t(
											'form.required.transfer_to'
										)!,
									},
								]}
							>
								<AppSelect
									placeholder={I18n?.t(
										'form.placeholder.transfer_to'
									)}
									options={walletNoteOptions}
									disabled={isEdit}
									showSearch
								/>
							</AppFormItem>
							<AppFormItem
								name='credit'
								label={I18n?.t('form.label.transfer_amount')}
								rules={[
									{
										required: true,
										message: I18n?.t(
											'form.required.transfer_amount'
										)!,
									},
									{
										pattern: /^[0-9]*$/,
										message: I18n?.t(
											'form.validation.only_number'
										)!,
									},
								]}
							>
								<AppInput
									placeholder={I18n?.t(
										'form.placeholder.transfer_amount'
									)}
								/>
							</AppFormItem>
						</>
					) : null
				}
			</Form.Item>

			{isLoading ? (
				<AppLoader />
			) : (
				<div className='flex justify-center gap-x-3 mt-10'>
					<AppButton
						type='text'
						htmlType='button'
						onClick={handleCancel}
					>
						{I18n?.t('label.cancel')}
					</AppButton>
					<AppButton
						type='primary'
						htmlType='submit'
					>
						{isCreate
							? I18n?.t('label.create.note.item')
							: I18n?.t('label.save')}
					</AppButton>
				</div>
			)}
		</Form>
	);
};

export default NoteItemsForm;
