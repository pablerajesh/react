import {
  ColDef,
  RowNodeSelectedEvent,
  RowSelectionOptions
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState } from "react";
import {
  customerColDefs,
  customerDefaultCallDef,
  ICustomer
} from "../types.def";

export interface IOrphanCustomersDisplayProps {
  orphanCustomers?: ICustomer[];
}

const OrphanCustomersDisplay = ({
  orphanCustomers
}: IOrphanCustomersDisplayProps) => {
  const defaultColDef = useMemo<ColDef<ICustomer>>(
      () => customerDefaultCallDef,
      []
    ),
    [columnDefs] = useState<ColDef<ICustomer>[]>(customerColDefs),
    [rowData, setRowData] = useState<ICustomer[] | undefined>(orphanCustomers),
    customersLoading = useMemo(() => rowData !== undefined, [rowData]),
    rowSelection = useMemo<RowSelectionOptions | "single" | "multiple">(() => {
      return {
        mode: "multiRow"
      };
    }, []);

  useEffect(() => {
    setRowData(orphanCustomers);
  }, [orphanCustomers]);

  const handleRowSelected = (event: RowNodeSelectedEvent) =>
    console.log(event.node.isSelected());

  return (
    <div
      id="orphan-customers-grid"
      className={"ag-theme-material"}
      style={{
        height: "85vh",
        minHeight: "85vh",
        width: "100%"
      }}
    >
      <AgGridReact
        loading={!customersLoading}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection={rowSelection}
        onRowSelected={handleRowSelected}
      />
    </div>
  );
};

export default OrphanCustomersDisplay;
