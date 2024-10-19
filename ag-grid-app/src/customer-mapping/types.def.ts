import { ColDef } from "ag-grid-community";

export interface ICustomer {
  id: number;
  name: string;
  isParent: boolean;
  parentId?: number;
}

export interface IOrphanCustomersDisplayProps {
  orphanCustomers?: ICustomer[];
}

export const customerDefaultCallDef: ColDef = {
  flex: 1,
  sortable: true
};

export const customerColDefs: ColDef<ICustomer>[] = [
  {
    field: "id",
    headerName: "Customer Id",
    cellDataType: "number",
    editable: false
  },
  {
    field: "name",
    headerName: "Customer Name",
    cellDataType: "string",
    editable: false
  }
];
