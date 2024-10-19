import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState } from "react";
import {
  customerColDef,
  customerDefaultCallDef,
  ICustomer,
  IOrphanCustomersDisplayProps
} from "../types.def";

const OrphanCustomersDisplay = ({
  orphanCustomers
}: IOrphanCustomersDisplayProps) => {
  const defaultColDef = useMemo(() => customerDefaultCallDef, []),
    [colDef] = useState<ColDef<ICustomer>[]>(customerColDef),
    [rowData, setRowData] = useState<ICustomer[] | undefined>(orphanCustomers),
    customersLoading = useMemo(() => rowData !== undefined, [rowData]);

  useEffect(() => {
    setRowData(orphanCustomers);
  }, [orphanCustomers]);

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
        columnDefs={colDef}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default OrphanCustomersDisplay;
