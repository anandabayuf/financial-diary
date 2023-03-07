export const API_BASE_PATH = process.env.REACT_APP_API_BASE_PATH || '';

export const ITEM_TYPE = [
	'Income',
	'Transfer or Withdraw',
	'Spend',
	'Spend Only In Wallet',
];

export const PUBLIC_KEY =
	process.env.REACT_APP_PUBLIC_KEY?.split(String.raw`\n`).join('\n') || '';
export const APP_NAME = process.env.REACT_APP_APP_NAME || '';
export const APP_VERSION = process.env.REACT_APP_APP_VERSION || '';
