import { Table } from 'antd';
import styled from 'styled-components';
import { StyledTableProps } from '../interfaces/interfaces';

const StyledTable = styled(Table)<StyledTableProps>`
	.ant-table {
		background-color: ${(props) => props.tabletheme?.container}!important;
	}

	th.ant-table-cell {
		background-color: ${(props) => props.tabletheme?.container} !important;
	}

	td.ant-table-cell {
		border-bottom: none !important;
	}

	td.ant-table-cell.ant-table-cell-row-hover {
		background-color: transparent !important;
	}

	tr.ant-table-row {
		border-bottom: none !important;
	}

	button.ant-pagination-item-link span {
		color: ${(props) => props.tabletheme?.button};
		display: flex;
		align-items: center;
		justify-content: center;
	}

	button.ant-pagination-item-link:disabled span {
		color: ${(props) => props.tabletheme?.container};
		display: flex;
		align-items: center;
		justify-content: center;
	}

	li.ant-pagination-item {
		font-family: 'Comfortaa', cursive !important;
		font-weight: 400 !important;
		border-color: transparent;

		a {
			color: ${(props) => props.tabletheme?.button};
		}

		a:hover {
			color: ${(props) => props.tabletheme?.button};
		}

		:hover {
			border-color: transparent;
		}
	}

	li.ant-pagination-item-active {
		background-color: ${(props) => props.tabletheme?.container};

		a {
			color: ${(props) => props.tabletheme?.text};
		}

		a:hover {
			color: ${(props) => props.tabletheme?.text};
		}
	}

	.ant-pagination-options-size-changer {
		.ant-select-selector {
			background-color: ${(props) => props.tabletheme?.container};
			border-color: transparent !important;
			font-family: 'Comfortaa', cursive !important;
			font-weight: 400 !important;
			color: ${(props) => props.tabletheme?.text};

			:hover {
				border-color: ${(props) =>
					props.tabletheme?.container} !important;
			}
		}

		.ant-select-arrow {
			color: ${(props) => props.tabletheme?.text};
		}

		.ant-select-dropdown {
			background-color: ${(props) => props.tabletheme?.container};
			color: ${(props) => props.tabletheme?.text} !important;
		}

		.ant-select-item-option {
			color: ${(props) => props.tabletheme?.text};
			font-family: 'Comfortaa', cursive !important;
			font-weight: 400 !important;
			:hover {
				background-color: ${(props) => props.tabletheme?.button};
			}
		}

		.ant-select-item-option-selected {
			background-color: ${(props) => props.tabletheme?.button};
		}
	}

	.ant-select-focused {
		.ant-select-selector {
			border-color: ${(props) => props.tabletheme?.container} !important;
		}
		.ant-select-selection-item {
			color: ${(props) => props.tabletheme?.text} !important;
		}
	}

	.ant-pagination-options-quick-jumper {
		color: ${(props) => props.tabletheme?.text} !important;
		font-family: 'Comfortaa', cursive !important;
		font-weight: 400 !important;

		input {
			background-color: ${(props) =>
				props.tabletheme?.container} !important;
			color: ${(props) => props.tabletheme?.text} !important;
			border: none !important;
		}
	}
`;

export default StyledTable;
