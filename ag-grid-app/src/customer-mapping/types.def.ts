import { ColDef } from "ag-grid-community";

export interface ICustomer {
  id: number;
  name: string;
  isParent: boolean;
  parentId?: number;
  isOrphan: boolean;
}

export interface IOrphanCustomersDisplayProps {
  orphanCustomers?: ICustomer[];
}

export const customerDefaultCallDef: ColDef = {
  flex: 1,
  sortable: true
};

export const customerColDef: ColDef<ICustomer>[] = [
  { field: "id" },
  { field: "name" }
];
