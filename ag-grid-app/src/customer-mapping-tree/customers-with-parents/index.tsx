import { Container, Typography } from "@mui/material";
import "ag-grid-charts-enterprise";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  customerDefaultCollDef,
  ICustomerHierarchy
} from "../../customer-mapping-common/types.def";

export interface CustomersWithParentsDisplayProp {
  customerHierarchies?: ICustomerHierarchy[];
}

const CustomersWithParentsDisplay = ({
  customerHierarchies
}: CustomersWithParentsDisplayProp) => {
  const [rowData, setRowData] = useState<ICustomerHierarchy[] | undefined>(
    customerHierarchies
  );
  const [columnDefs] = useState<ColDef<ICustomerHierarchy>[]>([
    {
      field: "code",
      headerName: "CUSTOMER CDOE",
      cellDataType: "text",
      editable: false,
      flex: 2
    }
  ]);
  const defaultColDef = useMemo<ColDef<ICustomerHierarchy>>(
    () => customerDefaultCollDef,
    []
  );
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      headerName: "NAME",
      minWidth: 280,
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: {
        suppressCount: true
      }
    };
  }, []);
  const getDataPath = useCallback((data: any) => data.path, []);

  useEffect(() => {
    setRowData(customerHierarchies);
  }, [customerHierarchies]);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h5">Orphan customers</Typography>
      <div
        id="customers-tree-grid-container"
        className={"ag-theme-material"}
        style={{
          height: "70vh",
          minHeight: "70vh",
          width: "100%"
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          groupDefaultExpanded={-1}
          treeData={true}
          getDataPath={getDataPath}
          overlayNoRowsTemplate="No customers to display..."
        />
      </div>
    </Container>
  );
};

export default CustomersWithParentsDisplay;
