export const getLongMonthFromDate = (
	dateString?: string,
	locale?: string
): string => {
	if (dateString) {
		return new Date(dateString).toLocaleString(locale, {
			month: 'long',
		});
	}

	return '';
};

export const getTwoDigitMonthStringFromDate = (dateString?: string): string => {
	if (dateString) {
		return ('0' + (new Date(dateString).getMonth() + 1)).slice(-2);
	}

	return '';
};

export const getFullYearFromDate = (dateString?: string): number => {
	if (dateString) {
		return new Date(dateString).getFullYear();
	}

	return 0;
};
