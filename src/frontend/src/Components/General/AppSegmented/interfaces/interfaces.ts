import { ColorState } from '../../../../Constants/Colors';
import { DataViewTypeNames } from '../../../../Constants/DataViewTypeNames';

export interface AppSegmentedProps {
	value?: DataViewTypeNames;
	handleChange?: (value: any) => void;
}

export interface StyledSegmentedProps {
	theme?: ColorState;
}
