export const Dark = {
	text: '#EEEEEE',
	halfText: 'rgba(238, 238, 238, 0.5)',
	title: '#F9F7F7',
	subTitle: '',
	bg: '#222831',
	container: '#393E46',
	button: '#3F72AF',
};

export const Light = {
	text: '#393E46',
	halfText: 'rgba(57, 62, 70, 0.5)',
	title: '#222831',
	subTitle: '',
	bg: '#F9F7F7',
	container: '#DBE2EF',
	button: '#91c3ff',
};

export type ColorState = typeof Dark | typeof Light;
