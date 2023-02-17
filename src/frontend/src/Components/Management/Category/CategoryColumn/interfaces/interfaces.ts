import { NavigateFunction } from 'react-router-dom';
import { i18n } from 'i18next';
import { ColumnsType } from 'antd/es/table';

export interface CategoryColumnsProps {
	navigate?: NavigateFunction;
	I18n?: i18n;
}

export type CategoryColumnsType =
	({}: CategoryColumnsProps) => ColumnsType<any>;
