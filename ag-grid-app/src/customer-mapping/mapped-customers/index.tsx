import { Container, Typography } from "@mui/material";
import { ColDef, RowSelectionOptions } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState } from "react";
import {
  customerColDefs,
  customerDefaultCallDef,
  ICustomer
} from "../types.def";

export interface IChildCustomersDisplayProps {
  parent?: ICustomer;
  children?: ICustomer[];
}

const ChildCustomersDisplay = ({
  parent,
  children
}: IChildCustomersDisplayProps) => {
  const defaultColDef = useMemo<ColDef<ICustomer>>(
      () => customerDefaultCallDef,
      []
    ),
    [columnDefs] = useState<ColDef<ICustomer>[]>(customerColDefs),
    [rowData, setRowData] = useState<ICustomer[] | undefined>(children),
    rowSelection = useMemo<RowSelectionOptions | "single" | "multiple">(() => {
      return {
        mode: "multiRow"
      };
    }, []);

  useEffect(() => {
    setRowData(children);
  }, [children]);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h5">
        Child customers {parent && `(${parent.name})`}
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
        />
      </div>
    </Container>
  );
};

export default ChildCustomersDisplay;
