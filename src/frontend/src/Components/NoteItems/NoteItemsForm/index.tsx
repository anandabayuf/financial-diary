import { NoteItemsFormProps } from './interfaces/interfaces';
import AppFormItem from '../../General/AppFormItem/index';
import AppSelect from '../../General/AppSelect';
import { SelectProps, Form } from 'antd';
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
	handleChangeDatePicker,
	handleSubmit,
	handleCancel,
}) => {
	const selectedWalletNoteId = useAppSelector(
		(state) => state.note.selectedWalletNote?.id
	);

	const theme = useTheme();

	const ItemTypeOptions: SelectProps['options'] = ITEM_TYPE.filter((el) =>
		isCategory
			? el !== 'Income' &&
			  el !== 'Spend Only In Wallet' &&
			  el !== 'Transfer or Withdraw'
			: el
	).map((el) => {
		return {
			label: el,
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
		// console.log(data);
		if (!isEdit && isCategory) {
			return {
				type: 'Spend',
			};
		}

		if (isEdit) {
			return {
				...data,
				date: dayjs(data.date),
				type: ITEM_TYPE[data.type],
				walletNoteId:
					selectedWalletNoteId === data.walletNoteId2 &&
					data.type === 1
						? data.walletNoteId
						: data.type === 1
						? data.walletNoteId2
						: data.walletNoteId,
			};
		}

		return {};
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
				label='Date'
				name='date'
				rules={[
					{
						required: true,
						message: 'Please select date',
					},
				]}
			>
				<AppDatePicker
					placeholder='Select Date'
					picker='date'
					onChange={handleChangeDatePicker}
				/>
			</AppFormItem>
			<AppFormItem
				label='Description'
				name='description'
				rules={[
					{
						required: true,
						message: 'Please input description',
					},
				]}
			>
				<AppInput placeholder='Input description...' />
			</AppFormItem>
			<AppFormItem
				label='Item Type'
				name='type'
				className='mb-1'
				rules={[
					{
						required: true,
						message: 'Please select item type',
					},
				]}
			>
				<AppSelect
					placeholder='Select item type'
					options={ItemTypeOptions}
					disabled={isEdit}
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
								title={
									getFieldValue('type') === 'Income'
										? 'Income is a type of note item to record income/value added.'
										: getFieldValue('type') === 'Spend'
										? 'Spend is a type of note item for recording expenses.'
										: getFieldValue('type') ===
										  'Spend Only In Wallet'
										? 'Spend Only In Wallet is a type of note item to record expenses only in the wallet.'
										: 'Transfer or Withdraw is a type of note item to record the transfer of money to the selected wallet.'
								}
								trigger={'click'}
							>
								<div className='flex justify-start items-center gap-x-2 mb-[24px]'>
									<AppText
										text={`What is ${getFieldValue(
											'type'
										)}?`}
										className='text-sm'
									/>
									<AiOutlineQuestionCircle
										color={theme?.text}
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
										label={'Category'}
										rules={[
											{
												required: true,
												message:
													'Please select category',
											},
										]}
									>
										<AppSelect
											placeholder='Select category'
											options={categoryNoteOptions}
											disabled={isEdit}
										/>
									</AppFormItem>
								)}
							{isCategory && (
								<AppFormItem
									name={'walletNoteId'}
									label={'Where do this spend come from?'}
									rules={[
										{
											required: true,
											message: 'Please select wallet',
										},
									]}
								>
									<AppSelect
										placeholder='Select wallet'
										options={walletNoteOptions}
										disabled={isEdit}
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
										? 'Income Amount'
										: 'Spend Amount'
								}
								rules={[
									{
										required: true,
										message:
											getFieldValue('type') === 'Income'
												? 'Please input income amount'
												: 'Please input spend amount',
									},
									{
										pattern: /^[0-9]*$/,
										message: 'Please input only number',
									},
								]}
							>
								<AppInput
									placeholder={
										getFieldValue('type') === 'Income'
											? 'Input income amount in number...'
											: 'Input spend amount in number...'
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
									selectedWalletNoteId === data.walletNoteId2
										? 'Transfer/Withdraw from Wallet'
										: 'Transfer/Withdraw to Wallet'
								}
								rules={[
									{
										required: true,
										message:
											'Please select destination wallet',
									},
								]}
							>
								<AppSelect
									placeholder='Select destination wallet'
									options={walletNoteOptions}
									disabled={isEdit}
								/>
							</AppFormItem>
							<AppFormItem
								name={'credit'}
								label={'Transfer/Withdraw Amount'}
								rules={[
									{
										required: true,
										message:
											'Please input transfer or withdraw amount',
									},
									{
										pattern: /^[0-9]*$/,
										message: 'Please input only number',
									},
								]}
							>
								<AppInput
									placeholder={
										'Input transfer or withdraw amount in number...'
									}
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
						Cancel
					</AppButton>
					<AppButton
						type='primary'
						htmlType='submit'
					>
						{isCreate ? 'Create' : 'Save'}
					</AppButton>
				</div>
			)}
		</Form>
	);
};

export default NoteItemsForm;
