"use strict";

import "ag-grid-charts-enterprise";
import {
  ColDef,
  GroupSelectionMode,
  RowSelectionOptions
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useMemo, useRef, useState } from "react";
import getData from "./data";
import "./styles.css";

const getGroupSelectsValue: () => GroupSelectionMode = () => {
  return (
    (document.querySelector<HTMLSelectElement>("#input-group-selection-mode")
      ?.value as any) ?? "self"
  );
};

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "800px", width: "100%" }), []);
  const [rowData] = useState<any[]>(getData());
  const [columnDefs] = useState<ColDef[]>([
    { field: "created" },
    { field: "modified" },
    {
      field: "size",
      aggFunc: "sum",
      valueFormatter: params => {
        const sizeInKb = params.value / 1024;
        if (sizeInKb > 1024) {
          return `${+(sizeInKb / 1024).toFixed(2)} MB`;
        } else {
          return `${+sizeInKb.toFixed(2)} KB`;
        }
      }
    }
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100
    };
  }, []);
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      headerName: "File Explorer",
      minWidth: 280,
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: {
        suppressCount: true
      }
    };
  }, []);
  const rowSelection = useMemo<
    RowSelectionOptions | "single" | "multiple"
  >(() => {
    return {
      mode: "multiRow",
      groupSelects: "self"
    };
  }, []);
  const getDataPath = useCallback((data: any) => data.path, []);

  const onSelectionModeChange = useCallback(() => {
    gridRef.current!.api.setGridOption("rowSelection", {
      mode: "multiRow",
      groupSelects: getGroupSelectsValue()
    });
  }, []);

  const onQuickFilterChanged = useCallback(() => {
    gridRef.current!.api.setGridOption(
      "quickFilterText",
      document.querySelector<HTMLInputElement>("#input-quick-filter")?.value
    );
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          <label>
            <span>Group selects:</span>
            <select
              id="input-group-selection-mode"
              onChange={onSelectionModeChange}
            >
              <option value="self">self</option>
              <option value="descendants">descendants</option>
              <option value="filteredDescendants">filteredDescendants</option>
            </select>
          </label>

          <label>
            <span>Quick Filter:</span>
            <input
              type="text"
              id="input-quick-filter"
              onInput={onQuickFilterChanged}
            />
          </label>
        </div>

        <div style={gridStyle} className={"ag-theme-material"}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            rowSelection={rowSelection}
            groupDefaultExpanded={-1}
            suppressAggFuncInHeader={true}
            treeData={true}
            getDataPath={getDataPath}
          />
        </div>
      </div>
    </div>
  );
};

export default GridExample;
