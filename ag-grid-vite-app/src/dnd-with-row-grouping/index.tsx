"use strict";

import {
    ColDef,
    RowDragCallbackParams,
    RowDragEndEvent
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { getData } from "./data";

var rowDrag = function (params: RowDragCallbackParams) {
    // only rows that are NOT groups should be draggable
    return !params.node.group;
};

const GridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(
        () => ({ width: "100%", height: "100%" }),
        []
    );
    const gridStyle = useMemo(() => ({ height: "95vh", width: "100%" }), []);
    const [rowData, setRowData] = useState<any[]>();
    const [columnDefs] = useState<ColDef[]>([
        { field: "athlete", rowDrag: rowDrag },
        { field: "country", rowGroup: true },
        { field: "year", width: 100 },
        { field: "date" },
        { field: "sport" },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" }
    ]);
    const defaultColDef = useMemo<ColDef>(
        () => ({
            width: 170,
            sortable: true,
            filter: true
        }),
        []
    );

    const onGridReady = useCallback(() => {
        setRowData(getData());
    }, []);

    const onRowDragMove = useCallback((event: RowDragEndEvent) => {
        var movingNode = event.node!;
        var overNode = event.overNode!;
        // find out what country group we are hovering over
        var groupCountry;
        if (overNode.group) {
            // if over a group, we take the group key (which will be the
            // country as we are grouping by country)
            groupCountry = overNode.key;
        } else {
            // if over a non-group, we take the country directly
            groupCountry = overNode.data.country;
        }
        var needToChangeParent = movingNode.data.country !== groupCountry;
        if (needToChangeParent) {
            var movingData = movingNode.data;
            movingData.country = groupCountry;
            gridRef.current!.api.applyTransaction({
                update: [movingData]
            });
            gridRef.current!.api.clearFocusedCell();
        }
    }, []);

    return (
        <div style={containerStyle}>
            <div
                style={gridStyle}
                className="ag-theme-alpine"
            >
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    groupDefaultExpanded={1}
                    onGridReady={onGridReady}
                    onRowDragMove={onRowDragMove}
                />
            </div>
        </div>
    );
};

export default GridExample;
