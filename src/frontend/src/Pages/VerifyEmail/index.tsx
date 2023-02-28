import { Link, useSearchParams } from 'react-router-dom';
import FrontLayout from '../../Layouts/FrontLayout';
import AppText from '../../Components/General/AppText/index';
import { useState, useEffect } from 'react';
import { verifyEmail } from '../../Api/Auth';
import AppLoader from '../../Components/General/AppLoader';
import AppMessage from '../../Components/General/AppMessage/index';
import { errorHandling } from '../../Api/errorHandling';
import useLocale from '../../Hooks/useLocale';
import { RiMailCheckLine, RiMailCloseLine } from 'react-icons/ri';
import { APP_NAME } from '../../Constants/Constants';
import useTheme from '../../Hooks/useTheme';
import AppTitle from '../../Components/General/AppTitle';
import AppLogo from '../../Components/General/AppLogo';
import { getRouteNames } from '../../Utils/RouteUtils';
import RouteNames from '../../Constants/RouteNames';
import AppButton from '../../Components/General/AppButton';

const VerifyEmailPage: React.FC = () => {
	const { I18n, language } = useLocale();
	const theme = useTheme();

	const [searchParams] = useSearchParams();

	const [isLoading, setIsloading] = useState(false);
	const [isSuccessVerify, setIsSuccessVerify] = useState(false);

	useEffect(() => {
		const verify = async () => {
			setIsloading(true);
			const token = searchParams.get('token');
			if (token !== null && token !== undefined && token !== '') {
				try {
					const response = await verifyEmail(token);

					AppMessage({
						type: 'success',
						content: I18n.t(response.data.message),
					});
					setIsSuccessVerify(true);
				} catch (error) {
					setIsSuccessVerify(false);
					errorHandling(error, I18n);
				}
			} else {
				setIsSuccessVerify(false);
			}

			setIsloading(false);
		};

		verify(); // eslint-disable-next-line
	}, [searchParams]);

	useEffect(() => {
		document.title = `${I18n.t('email_verification')} - ${APP_NAME}`;
	}, [I18n, language]);

	return (
		<FrontLayout>
			<div className='flex-col'>
				<div className='mb-5 flex justify-center'>
					<Link
						to={getRouteNames(RouteNames.LOGIN)}
						replace
					>
						<AppLogo />
					</Link>
				</div>
				<div className='mb-5'>
					<AppTitle
						title={I18n.t('email_verification')!}
						level={4}
						className='text-center'
					/>
				</div>

				{isLoading ? (
					<AppLoader />
				) : (
					<>
						{!isSuccessVerify ? (
							<div className='flex-col'>
								<div className='flex justify-center mb-3'>
									<RiMailCloseLine
										color={theme?.button}
										size={'128px'}
									/>
								</div>
								<AppText text={I18n.t('verify_email.failed')} />
							</div>
						) : (
							<div className='flex-col'>
								<div className='flex justify-center mb-3'>
									<RiMailCheckLine
										color={theme?.button}
										size={'128px'}
									/>
								</div>
								<AppText
									text={I18n.t('verify_email.success')}
								/>
							</div>
						)}
						<div className='mt-5 flex justify-center'>
							<Link
								to={getRouteNames(RouteNames.LOGIN)}
								replace
							>
								<AppButton type='primary'>
									{I18n.t('label.go_to_home')}
								</AppButton>
							</Link>
						</div>
					</>
				)}
			</div>
		</FrontLayout>
	);
};

export default VerifyEmailPage;
