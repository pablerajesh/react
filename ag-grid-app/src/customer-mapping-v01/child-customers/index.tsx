import { Container, Typography } from "@mui/material";
import { ColDef, RowSelectionOptions } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState } from "react";
import {
  customerColDefs,
  customerDefaultCollDef,
  ICustomer
} from "../../customer-mapping-common/types.def";

export interface IChildCustomersDisplayProps {
  parentCustomer?: ICustomer;
  childCustomers?: ICustomer[];
}

const ChildCustomersDisplay = ({
  parentCustomer,
  childCustomers
}: IChildCustomersDisplayProps) => {
  const defaultColDef = useMemo<ColDef<ICustomer>>(
      () => customerDefaultCollDef,
      []
    ),
    [columnDefs] = useState<ColDef<ICustomer>[]>(customerColDefs),
    [rowData, setRowData] = useState<ICustomer[] | undefined>(childCustomers),
    rowSelection = useMemo<RowSelectionOptions | "single" | "multiple">(() => {
      return {
        mode: "multiRow"
      };
    }, []);

  useEffect(() => {
    setRowData(childCustomers);
  }, [childCustomers]);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h5">
        Child customers {parentCustomer && `(${parentCustomer.name})`}
      </Typography>
      <div
        id="child-customers-grid-container"
        className={"ag-theme-material"}
        style={{
          height: "70vh",
          minHeight: "70vh",
          width: "100%"
        }}
      >
        <AgGridReact
          gridId="child-customers-grid"
          loading={false}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={rowSelection}
          overlayNoRowsTemplate="No child customers to display..."
        />
      </div>
    </Container>
  );
};

export default ChildCustomersDisplay;
