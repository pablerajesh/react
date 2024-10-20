import { Container, Typography } from "@mui/material";
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
    orphanCustomersLoading = useMemo(() => rowData !== undefined, [rowData]),
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
    <Container sx={{ mt: 2 }}>
      <Typography variant="h5">Orphan customers</Typography>
      <div
        id="orphan-customers-grid-container"
        className={"ag-theme-material"}
        style={{
          height: "70vh",
          minHeight: "70vh",
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
          onRowSelected={handleRowSelected}
        />
      </div>
    </Container>
  );
};

export default OrphanCustomersDisplay;
