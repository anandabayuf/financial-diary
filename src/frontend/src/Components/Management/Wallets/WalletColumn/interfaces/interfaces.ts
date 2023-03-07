import { NavigateFunction } from 'react-router-dom';
import { i18n } from 'i18next';
import { ColumnsType } from 'antd/es/table';
import { TWalletResponse } from '../../../../../Api/interfaces/types';

export interface WalletColumnProps {
	navigate?: NavigateFunction;
	I18n?: i18n;
}

export type WalletColumnsType =
	({}: WalletColumnProps) => ColumnsType<TWalletResponse>;
