import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";
import { formatChildren, mockAccounts } from "./mock-accounts";

const AccountGrid = () => {
  const [columnDefs] = useState<ColDef[]>([
    { field: "GroupAccountNumber", headerName: "Group Account Number" },
    { field: "AccountName", headerName: "Account Name" },
    { field: "CompanyName", headerName: "Company Name" },
    { field: "AccountNumber", headerName: "Account Number" }
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100
    };
  }, []);
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      headerName: "Account Name (autoGroup)",
      field: "AccountName",
      flex: 1.3,
      cellRendererParams: {
        checkbox: true
      }
    };
  }, []);

  return (
    <div
      className="ag-theme-material"
      style={{
        margin: "auto",
        width: "100%",
        height: "800px",
        marginBottom: 20
      }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        treeData={true}
        getDataPath={data => data.hierarchy}
        autoGroupColumnDef={autoGroupColumnDef}
        rowData={formatChildren(mockAccounts)}
      />
    </div>
  );
};
export default AccountGrid;
