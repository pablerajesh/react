import { TableCellProps } from "@mui/material";

export interface NestedTableProp {
    readonly data: any;
    readonly specs: readonly NestedTableSpec[];
}

export interface NestedTableSpec {
    readonly dataKey: string;
    readonly cellSpecs: readonly CellSpec[];
    readonly title?: string;
}

export interface CellSpec {
    readonly dataKey: string;
    readonly headerCellSpec: HeaderCellSpec;
    readonly dataCellSpec?: DataCellSpec;
}

export interface HeaderCellSpec {
    readonly label: string;
    readonly cellProps?: TableCellProps;
}

export interface DataCellSpec {
    readonly cellProps?: TableCellProps;
}

export interface HeaderRowProp {
    readonly cellSpecs: readonly HeaderCellSpec[];
}

export interface DataRowSpec {
    readonly dataKey: string;
    readonly cellSpecs?: DataCellSpec;
}

export interface DataRowProp {
    readonly data: any;
    readonly specs: readonly DataRowSpec[];
    readonly childTableSpecs: readonly NestedTableSpec[];
}

export interface TableTitleProp {
    readonly titleText?: string;
}
