import { DetailNoteFormProps } from './interfaces/interfaces';
import { Form, Space } from 'antd';
import AppFormItem from '../../../General/AppFormItem';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import AppCheckboxGroup from '../../../General/AppCheckboxGroup/index';
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

const DetailNoteForm: React.FC<DetailNoteFormProps> = ({
	walletData,
	categoryData,
	isWallet = false,
	isCategory = false,
	isEstimation = false,
	isLoading,
	isFetching,
	handleSubmit,
	handleCancel,
}) => {
	const [form] = Form.useForm();

	const [selectedWallets, setSelectedWallets] = useState<string[]>();
	const [selectedCategories, setSelectedCategories] = useState<string[]>();

	const filteredWalletOptions = walletData
		?.filter((wallet) => !selectedWallets?.includes(wallet._id))
		.map((wallet) => {
			return {
				value: wallet._id,
				label: wallet.name,
			};
		});

	const filteredCategoryOptions = categoryData
		?.filter((category) => !selectedCategories?.includes(category._id))
		.map((category) => {
			return {
				value: category._id,
				label: category.name,
			};
		});

	const checkboxOptions: () => CheckboxGroupProps['options'] = () => {
		if (isWallet && walletData) {
			return walletData.map((el) => {
				return {
					label: el.name,
					value: el._id,
				};
			});
		} else if (isCategory && categoryData) {
			return categoryData.map((el) => {
				return {
					label: el.name,
					value: el._id,
				};
			});
		}
	};

	const handleValuesChange = (values: any) => {
		if (values && values.wallets) {
			const wallet = values.wallets.filter((el: any) => el);
			if (wallet.length > 0) {
				const selectedWallet = form
					.getFieldValue('wallets')
					.map((el: any) => {
						if (el && el.walletId) {
							return el.walletId.value;
						}
					});
				setSelectedWallets(selectedWallet);
			} else {
				setSelectedWallets([]);
			}
		} else if (values && values.categories) {
			const category = values.categories.filter((el: any) => el);
			if (category.length > 0) {
				const selectedCategory = form
					.getFieldValue('categories')
					.map((el: any) => {
						if (el && el.categoryId) {
							return el.categoryId.value;
						}
					});
				setSelectedCategories(selectedCategory);
			} else {
				setSelectedCategories([]);
			}
		}
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
		>
			{(walletData && walletData.length > 0) ||
			(categoryData && categoryData.length > 0) ? (
				isWallet || isCategory ? (
					<AppFormItem
						label={
							isWallet
								? 'Select Wallet you want to add to the note'
								: 'Select Category you want to add to the note'
						}
						name='ids'
						rules={[
							{
								required: true,
								message: 'Please select minimum 1!',
							},
						]}
					>
						<AppCheckboxGroup options={checkboxOptions()} />
					</AppFormItem>
				) : (
					<AppTabs
						items={[
							{
								key: 'detail-note-form-wallet-tab',
								label: (
									<div className='flex justify-center items-center gap-x-2'>
										<IoWalletOutline />
										<AppText text='Wallet' />
									</div>
								),
								children: (
									<AppFormItem
										label={
											'Select Wallet you want to add to the note'
										}
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
																				'Please select wallet',
																		},
																	]}
																	className='w-[200px]'
																>
																	<AppSelect
																		allowClear
																		labelInValue
																		placeholder='Select Wallet'
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
																				'Estimated balance must be filled',
																		},
																		{
																			pattern:
																				/^[0-9]*$/,
																			message:
																				'Please input only number',
																		},
																	]}
																>
																	<AppInput placeholder='Input balance estimation' />
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
														Add Wallet
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
										<AppText text='Category' />
									</div>
								),
								children: (
									<AppFormItem
										label={
											'Select Category you want to add to the note'
										}
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
																				'Please select category',
																		},
																	]}
																	className='w-[200px]'
																>
																	<AppSelect
																		allowClear
																		labelInValue
																		placeholder='Select Category'
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
																				'Estimated total must be filled',
																		},
																		{
																			pattern:
																				/^[0-9]*$/,
																			message:
																				'Please input only number',
																		},
																	]}
																>
																	<AppInput placeholder='Input total estimation' />
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
														Add Category
													</AppButton>
												</>
											)}
										</Form.List>
									</AppFormItem>
								),
							},
						]}
					/>
				)
			) : (
				<AppEmpty className='mb-5' />
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
						Cancel
					</AppButton>
					{((walletData && walletData.length > 0) ||
						(categoryData && categoryData.length > 0)) && (
						<AppButton
							type='primary'
							htmlType='submit'
						>
							Add to the note
						</AppButton>
					)}
				</div>
			)}
		</Form>
	);
};

export default DetailNoteForm;
