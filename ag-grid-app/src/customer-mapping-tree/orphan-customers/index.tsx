import { Container, Typography } from "@mui/material";
import { ColDef, RowSelectionOptions } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState } from "react";
import {
  customerColDefs,
  customerDefaultCollDef,
  ICustomer
} from "../../customer-mapping-common/types.def";

export interface IOrphanCustomersDisplayProps {
  orphanCustomers?: ICustomer[];
}

const OrphanCustomersDisplay = ({
  orphanCustomers
}: IOrphanCustomersDisplayProps) => {
  const defaultColDef = useMemo<ColDef<ICustomer>>(
      () => customerDefaultCollDef,
      []
    ),
    [columnDefs] = useState<ColDef<ICustomer>[]>(customerColDefs),
    [rowData, setRowData] = useState<ICustomer[] | undefined>(orphanCustomers),
    orphanCustomersLoading = useMemo(() => rowData !== undefined, [rowData]),
    rowSelection = useMemo<RowSelectionOptions | "single" | "multiple">(() => {
      return {
        mode: "multiRow"
      };
    }, []);

  useEffect(() => {
    setRowData(orphanCustomers);
  }, [orphanCustomers]);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h5">ORPHAN CUSTOMERS</Typography>
      <div
        id="orphan-customers-grid-container"
        className={"ag-theme-material"}
        style={{
          height: "80vh",
          minHeight: "80vh",
          width: "100%"
        }}
      >
        <AgGridReact
          gridId="orphan-customers-grid"
          loading={!orphanCustomersLoading}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={rowSelection}
          overlayNoRowsTemplate="No orphan customers to display..."
        />
      </div>
    </Container>
  );
};

export default OrphanCustomersDisplay;
