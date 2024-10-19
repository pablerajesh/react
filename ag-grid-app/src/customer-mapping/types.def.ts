import { ColDef } from "ag-grid-community";

export interface ICustomer {
  id: number;
  name: string;
  isParent: boolean;
  parentId?: number;
}

export const customerDefaultCallDef: ColDef = {
  flex: 1,
  sortable: true
};

export const customerColDefs: ColDef<ICustomer>[] = [
  {
    field: "id",
    headerName: "CUSTOMER ID",
    cellDataType: "number",
    editable: false
  },
  {
    field: "name",
    headerName: "CUSTOMER NAME",
    cellDataType: "text",
    editable: false
  }
];
