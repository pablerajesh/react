import { Container, Typography } from "@mui/material";
import "ag-grid-charts-enterprise";
import {
  ColDef,
  RowSelectionOptions,
  SelectionChangedEvent
} from "ag-grid-community";
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
    ),
    [columnDefs] = useState<ColDef<ICustomerHierarchy>[]>([
      {
        field: "code",
        headerName: "CUSTOMER CDOE",
        cellDataType: "text",
        editable: false,
        flex: 2
      }
    ]),
    defaultColDef = useMemo<ColDef<ICustomerHierarchy>>(
      () => customerDefaultCollDef,
      []
    ),
    autoGroupColumnDef = useMemo<ColDef>(() => {
      return {
        headerName: "NAME",
        minWidth: 280,
        cellRenderer: "agGroupCellRenderer",
        cellRendererParams: {
          suppressCount: true
        }
      };
    }, []),
    rowSelection = useMemo<RowSelectionOptions | "single" | "multiple">(() => {
      return {
        mode: "multiRow",
        groupSelects: "self"
      };
    }, []),
    getDataPath = useCallback((data: any) => data.path, []);

  useEffect(() => {
    setRowData(customerHierarchies);
  }, [customerHierarchies]);

  const handleSelectionChanged = (event: SelectionChangedEvent) => {
    const selectedOrphanCustomers: ICustomerHierarchy[] = event.api
      .getSelectedNodes()
      .map(node => node.data as ICustomerHierarchy);
    console.log("[rp]", selectedOrphanCustomers);
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h5">PARENT & CHILD CUSTOMERS</Typography>
      <div
        id="customers-tree-grid-container"
        className={"ag-theme-material"}
        style={{
          height: "75vh",
          minHeight: "75vh",
          width: "100%"
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          groupDefaultExpanded={0}
          treeData={true}
          getDataPath={getDataPath}
          rowSelection={rowSelection}
          overlayNoRowsTemplate="No customers to display..."
          onSelectionChanged={handleSelectionChanged}
        />
      </div>
    </Container>
  );
};

export default CustomersWithParentsDisplay;
