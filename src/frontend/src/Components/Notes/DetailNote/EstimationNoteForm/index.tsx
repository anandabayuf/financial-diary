import { EstimationNoteFormProps } from './interfaces/interfaces';
import { Form, Space } from 'antd';
import AppFormItem from '../../../General/AppFormItem';
import AppButton from '../../../General/AppButton/index';
import AppLoader from '../../../General/AppLoader';
import AppEmpty from '../../../General/AppEmpty';
import AppTabs from '../../../General/AppTabs';
import { IoWalletOutline } from 'react-icons/io5';
import AppText from '../../../General/AppText/index';
import { BsCreditCard2Front } from 'react-icons/bs';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import AppSelect from '../../../General/AppSelect/index';
import AppInput from '../../../General/AppInput';
import { useState } from 'react';

const EstimationNoteForm: React.FC<EstimationNoteFormProps> = ({
	walletData,
	categoryData,
	data,
	isAdd = false,
	isEdit = false,
	isFetching,
	isLoading,
	I18n,
	handleCancel,
	handleSubmit,
}) => {
	const [form] = Form.useForm();

	const [selectedWallets, setSelectedWallets] = useState<string[]>();
	const [selectedCategories, setSelectedCategories] = useState<string[]>();

	const filteredWalletOptions = walletData
		?.filter((wallet: any) => !selectedWallets?.includes(wallet._id))
		.map((wallet: any) => {
			return {
				value: wallet._id,
				label: wallet.name,
			};
		});

	const filteredCategoryOptions = categoryData
		?.filter((category: any) => !selectedCategories?.includes(category._id))
		.map((category: any) => {
			return {
				value: category._id,
				label: category.name,
			};
		});

	const handleValuesChange = (values: any) => {
		if (values && values.wallets) {
			const wallet = values.wallets.filter((el: any) => el);
			if (wallet.length > 0) {
				const selectedWallet = form.getFieldValue('wallets').map(
					(
						el: any // eslint-disable-next-line
					) => {
						if (el && el.walletId) {
							return el.walletId.value;
						}
					}
				);
				setSelectedWallets(selectedWallet);
			} else {
				setSelectedWallets([]);
			}
		} else if (values && values.categories) {
			const category = values.categories.filter((el: any) => el);
			if (category.length > 0) {
				const selectedCategory = form.getFieldValue('categories').map(
					(
						el: any // eslint-disable-next-line
					) => {
						if (el && el.categoryId) {
							return el.categoryId.value;
						}
					}
				);
				setSelectedCategories(selectedCategory);
			} else {
				setSelectedCategories([]);
			}
		}
	};

	const intitialValues = () => {
		if (isEdit && data) {
			if (data.estimated.total !== undefined) {
				return {
					categoryName: data.name,
					estimatedTotal: data.estimated.total,
				};
			} else {
				return {
					walletName: data.name,
					estimatedBalance: data.estimated.balance,
				};
			}
		}

		return {};
	};
	return isFetching ? (
		<AppLoader />
	) : (
		<Form
			form={form}
			autoComplete='on'
			layout='vertical'
			onFinish={handleSubmit}
			onValuesChange={handleValuesChange}
			initialValues={intitialValues()}
		>
			{isAdd ? (
				(walletData && walletData.length > 0) ||
				(categoryData && categoryData.length > 0) ? (
					<AppTabs
						items={[
							{
								key: 'detail-note-form-wallet-tab',
								label: (
									<div className='flex justify-center items-center gap-x-2'>
										<IoWalletOutline />
										<AppText
											text={I18n?.t('label.wallet')}
										/>
									</div>
								),
								children: (
									<AppFormItem
										label={I18n?.t(
											'form.label.note.wallet.budget'
										)}
									>
										<Form.List name='wallets'>
											{(fields, { add, remove }) => (
												<>
													{fields.map(
														({
															key,
															name,
															...restField
														}) => (
															<Space
																key={key}
																className='flex'
																align='baseline'
															>
																<AppFormItem
																	{...restField}
																	name={[
																		name,
																		'walletId',
																	]}
																	rules={[
																		{
																			required:
																				true,
																			message:
																				I18n?.t(
																					'form.required.wallet'
																				)!,
																		},
																	]}
																	className='w-[200px]'
																>
																	<AppSelect
																		allowClear
																		labelInValue
																		placeholder={I18n?.t(
																			'form.placeholder.wallet'
																		)}
																		options={
																			filteredWalletOptions
																		}
																	/>
																</AppFormItem>
																<AppFormItem
																	{...restField}
																	name={[
																		name,
																		'estimatedBalance',
																	]}
																	rules={[
																		{
																			required:
																				true,
																			message:
																				I18n?.t(
																					'form.required.balance_budget'
																				)!,
																		},
																		{
																			pattern:
																				/^[0-9]*$/,
																			message:
																				I18n?.t(
																					'form.validation.only_number'
																				)!,
																		},
																	]}
																>
																	<AppInput
																		placeholder={I18n?.t(
																			'form.placeholder.balance_budget'
																		)}
																	/>
																</AppFormItem>
																<AppButton
																	type='text'
																	icon={
																		<div className='flex justify-center items-center'>
																			<AiOutlineMinusCircle />
																		</div>
																	}
																	onClick={() =>
																		remove(
																			name
																		)
																	}
																/>
															</Space>
														)
													)}
													<AppButton
														type='text'
														block
														onClick={() => add()}
													>
														{I18n?.t(
															'label.create.note.wallet'
														)}
													</AppButton>
												</>
											)}
										</Form.List>
									</AppFormItem>
								),
							},
							{
								key: 'detail-note-form-category-tab',
								label: (
									<div className='flex justify-center items-center gap-x-2'>
										<BsCreditCard2Front />
										<AppText
											text={I18n?.t('label.category')}
										/>
									</div>
								),
								children: (
									<AppFormItem
										label={I18n?.t(
											'form.label.note.category.budget'
										)}
									>
										<Form.List name='categories'>
											{(fields, { add, remove }) => (
												<>
													{fields.map(
														({
															key,
															name,
															...restField
														}) => (
															<Space
																key={key}
																className='flex'
																align='baseline'
															>
																<AppFormItem
																	{...restField}
																	name={[
																		name,
																		'categoryId',
																	]}
																	rules={[
																		{
																			required:
																				true,
																			message:
																				I18n?.t(
																					'form.required.category'
																				)!,
																		},
																	]}
																	className='w-[200px]'
																>
																	<AppSelect
																		allowClear
																		labelInValue
																		placeholder={I18n?.t(
																			'form.placeholder.category'
																		)}
																		options={
																			filteredCategoryOptions
																		}
																	/>
																</AppFormItem>
																<AppFormItem
																	{...restField}
																	name={[
																		name,
																		'estimatedTotal',
																	]}
																	rules={[
																		{
																			required:
																				true,
																			message:
																				I18n?.t(
																					'form.required.total_budget'
																				)!,
																		},
																		{
																			pattern:
																				/^[0-9]*$/,
																			message:
																				I18n?.t(
																					'form.validation.only_number'
																				)!,
																		},
																	]}
																>
																	<AppInput
																		placeholder={I18n?.t(
																			'form.placeholder.total_budget'
																		)}
																	/>
																</AppFormItem>
																<AppButton
																	type='text'
																	icon={
																		<div className='flex justify-center items-center'>
																			<AiOutlineMinusCircle />
																		</div>
																	}
																	onClick={() =>
																		remove(
																			name
																		)
																	}
																/>
															</Space>
														)
													)}
													<AppButton
														type='text'
														block
														onClick={() => add()}
													>
														{I18n?.t(
															'label.create.note.category'
														)}
													</AppButton>
												</>
											)}
										</Form.List>
									</AppFormItem>
								),
							},
						]}
					/>
				) : (
					<AppEmpty className='mb-5' />
				)
			) : (
				isEdit &&
				data && (
					<>
						{data.estimated.balance !== undefined ? (
							<AppFormItem
								label={I18n?.t('form.label.wallet')}
								name={'walletName'}
								extra={I18n?.t('form.extra.wallet')}
							>
								<AppSelect disabled />
							</AppFormItem>
						) : (
							<AppFormItem
								label={I18n?.t('form.label.category')}
								name={'categoryName'}
								extra={I18n?.t('form.extra.category')}
							>
								<AppSelect disabled />
							</AppFormItem>
						)}
						{data.estimated.balance !== undefined ? (
							<AppFormItem
								label={I18n?.t('form.label.balance_budget')}
								name={'estimatedBalance'}
								rules={[
									{
										required: true,
										message: I18n?.t(
											'form.required.balance_budget'
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
										'form.placeholder.balance_budget'
									)}
								/>
							</AppFormItem>
						) : (
							<AppFormItem
								label={I18n?.t('form.label.total_budget')}
								name={'estimatedTotal'}
								rules={[
									{
										required: true,
										message: I18n?.t(
											'form.required.total_budget'
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
										'form.placeholder.total_budget'
									)}
								/>
							</AppFormItem>
						)}
					</>
				)
			)}

			{isLoading ? (
				<AppLoader />
			) : (
				<div className='flex justify-center gap-x-3'>
					<AppButton
						type='text'
						htmlType='button'
						onClick={handleCancel}
					>
						{I18n?.t('label.cancel')}
					</AppButton>
					{((walletData && walletData.length > 0) ||
						(categoryData && categoryData.length > 0) ||
						(data !== undefined && data !== null)) && (
						<AppButton
							type='primary'
							htmlType='submit'
						>
							{isAdd
								? I18n?.t('label.create.note.budget')
								: I18n?.t('label.save')}
						</AppButton>
					)}
				</div>
			)}
		</Form>
	);
};

export default EstimationNoteForm;
