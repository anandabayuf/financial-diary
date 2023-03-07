import { NavigateFunction } from 'react-router-dom';
import { i18n } from 'i18next';
import { ColumnsType } from 'antd/es/table';
import { TCategoryResponse } from '../../../../../Api/interfaces/types';

export interface CategoryColumnsProps {
	navigate?: NavigateFunction;
	I18n?: i18n;
}

export type CategoryColumnsType =
	({}: CategoryColumnsProps) => ColumnsType<TCategoryResponse>;
