export const toURLFormat = (text: string) => {
	return text
		.toLowerCase()
		.split(' ')
		.filter((el) => el !== '-')
		.join('-');
};
