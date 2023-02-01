import { DetailNoteGridProps } from './interfaces/interfaces';
import AppButton from '../../../General/AppButton';
import AppText from '../../../General/AppText';
import AppTitle from '../../../General/AppTitle';
import useTheme from '../../../../Hooks/useTheme';
import StyledDetailNoteGridCard from './styled/StyledDetailNoteGridCard';
import StyledGrid from '../../NotesList/NoteGrid/styled/StyledGrid';
import { IoWalletOutline } from 'react-icons/io5';
import { BsCreditCard2Front } from 'react-icons/bs';
import { formatIDR } from '../../../../Utils/CurrencyUtils';
import AppEmpty from '../../../General/AppEmpty';
import AppTooltip from '../../../General/AppTooltip/index';

const DetailNoteGrid: React.FC<DetailNoteGridProps> = ({
	isWallet,
	data,
	handleView,
}) => {
	const theme = useTheme();

	return (
		<div className='flex justify-center'>
			{data?.length! > 0 ? (
				<StyledGrid>
					{data?.map((el, index) => {
						return (
							<StyledDetailNoteGridCard
								key={index}
								isMobileShowCard='true'
								className={`rounded-2xl shadow-2xl`}
							>
								<div className='flex justify-between items-center mb-5'>
									{isWallet ? (
										<IoWalletOutline
											color={theme?.text}
											size={32}
										/>
									) : (
										<BsCreditCard2Front
											color={theme?.text}
											size={32}
										/>
									)}
									<div>
										<AppTooltip
											title={
												isWallet
													? el.wallet.name
													: el.category.name
											}
										>
											<div className='flex justify-end max-w-[100px] max-[320px]:max-w-[220px]'>
												<AppText
													text={
														isWallet
															? el.wallet.name
															: el.category.name
													}
													className='truncate ...'
												/>
											</div>
										</AppTooltip>
										<AppTooltip
											title={formatIDR(
												isWallet ? el.balance : el.total
											)}
										>
											<div className='flex justify-end max-w-[100px] max-[320px]:max-w-[220px]'>
												<AppTitle
													title={formatIDR(
														isWallet
															? el.balance
															: el.total
													)}
													level={5}
													className='truncate ...'
												/>
											</div>
										</AppTooltip>
										<div className='flex justify-end'></div>
									</div>
								</div>
								<div className='flex justify-end'>
									<AppButton
										type='text'
										onClick={() =>
											handleView && handleView(el)
										}
									>
										View
									</AppButton>
								</div>
							</StyledDetailNoteGridCard>
						);
					})}
				</StyledGrid>
			) : (
				<AppEmpty />
			)}
		</div>
	);
};

export default DetailNoteGrid;
