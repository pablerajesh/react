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
    field: "id",
    headerName: "CUSTOMER ID",
    cellDataType: "number",
    editable: false,
    flex: 1
  },
  {
    field: "code",
    headerName: "CUSTOMER CDOE",
    cellDataType: "text",
    editable: false,
    flex: 2
  },
  {
    field: "name",
    headerName: "CUSTOMER NAME",
    cellDataType: "text",
    editable: false,
    flex: 2
  }
];

interface IAutoCompleteOption {
  label: string;
}
export interface ICustomerAutocompleteOption extends IAutoCompleteOption {
  id: number;
  name: string;
}
