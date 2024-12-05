import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";
import SplitButton, { IButtonSpec } from "../components/mui/SplitButton";
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

  const buttonSpecs: IButtonSpec[] = [
    {
      id: 1,
      text: "Send Email",
      disabled: false,
      onClick: () => {
        console.log("[rp] Send Email");
      }
    },
    {
      id: 2,
      text: "Schedule",
      disabled: false,
      onClick: () => {
        console.log("[rp] Schedule Email");
      }
    }
  ];

  return (
    <>
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
          rowData={formatChildren(mockAccounts)}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          treeData={true}
          getDataPath={data => data.hierarchy}
          autoGroupColumnDef={autoGroupColumnDef}
          rowSelection={"multiple"}
        />
      </div>
      <SplitButton
        props={{
          variant: "contained",
          color: "warning",
          size: "large"
        }}
        buttonSpecs={buttonSpecs}
      />
    </>
  );
};
export default AccountGrid;
