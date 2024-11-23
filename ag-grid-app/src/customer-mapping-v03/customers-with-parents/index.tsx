import { Container, Typography } from "@mui/material";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { getCustomerHierarchies } from "../../customer-mapping-common/service";
import {
  customerDefaultCallDef,
  ICustomerHierarchy
} from "../../customer-mapping-common/types.def";

const CustomersWithParentsDisplay = () => {
  const [rowData, setRowData] = useState<ICustomerHierarchy[]>();
  const [columnDefs] = useState<ColDef<ICustomerHierarchy>[]>([
    {
      field: "id",
      headerName: "CUSTOMER ID",
      cellDataType: "number",
      editable: false,
      flex: 1
    },
    {
      field: "code",
      headerName: "CUSTOMER CODE",
      cellDataType: "text",
      editable: false,
      flex: 2
    }
  ]);

  useEffect(() => {
    const customers = getCustomerHierarchies();
    setRowData(customers);
  }, []);

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
          gridId="customer-hierarchies"
          loading={false}
          columnDefs={columnDefs}
          defaultColDef={customerDefaultCallDef}
          rowData={rowData}
          overlayNoRowsTemplate="No child customers to display..."
        />
      </div>
    </Container>
  );
};

export default CustomersWithParentsDisplay;
