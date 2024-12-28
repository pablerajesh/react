import { ColDef, IRowDragItem, IRowNode } from "ag-grid-community";

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
        rowDrag: true,
        rowDragText: (params: IRowDragItem) => {
            const customersBeingDragged: ICustomer[] = params.rowNodes!.map(
                (rowNode: IRowNode) => rowNode.data as ICustomer
            );
            const maxInlineCustomerNames: number = 3;
            const customerNames = customersBeingDragged
                .slice(0, maxInlineCustomerNames)
                .map(customer => customer.name)
                .join(", ");

            if (customersBeingDragged.length > 3) {
                return `Moving ${customerNames} ... (${
                    customersBeingDragged.length - maxInlineCustomerNames
                } more)`;
            }
            return `Moving ${customerNames}`;
        },
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
