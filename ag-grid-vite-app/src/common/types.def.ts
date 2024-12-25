import { ColDef } from "ag-grid-community";

export interface ICustomer {
    id: number;
    code: string;
    name: string;
    isParent: boolean;
    isOrphan: boolean;
    parentId?: number;
}

export interface ICustomerHierarchy extends ICustomer {
    path: string[];
}

export const customerDefaultCollDef: ColDef = {
    flex: 1,
    sortable: true
};

export const customerColDefs: ColDef<ICustomer>[] = [
    {
        field: "name",
        headerName: "CUSTOMER NAME",
        cellDataType: "text",
        headerCheckboxSelection: true,
        checkboxSelection: true,
        editable: false,
        flex: 2
    },
    {
        field: "code",
        headerName: "CUSTOMER CDOE",
        cellDataType: "text",
        editable: false,
        flex: 2
    }
];
