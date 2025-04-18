import { ColDef, RowDragEndEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import React, { useMemo, useRef, useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface RowData {
    id: number;
    name: string;
}

const initialRowData: RowData[] = [
    { id: 1, name: "Item One" },
    { id: 2, name: "Item Two" },
    { id: 3, name: "Item Three" }
];

const ManualDraggableAgGrid: React.FC = () => {
    const [rowData, setRowData] = useState<RowData[]>(initialRowData);
    const gridRef = useRef<AgGridReact<RowData>>(null);

    const columnDefs: ColDef<RowData>[] = useMemo(
        () => [
            { field: "id", headerName: "ID" },
            {
                field: "name",
                headerName: "Name",
                rowDrag: true,
                cellRenderer: (params: any) => (
                    <span data-testid={`cell-${params.data.id}`}>
                        {params.value}
                    </span>
                )
            }
        ],
        []
    );

    const onRowDragEnd = (event: RowDragEndEvent) => {
        if (event.overIndex === undefined || event.node.rowIndex === undefined)
            return;

        const fromIndex = event.node.rowIndex;
        const toIndex = event.overIndex;
        if (fromIndex === toIndex) return;

        const newData = [...rowData];
        const [movedRow] = newData.splice(fromIndex!, 1);
        newData.splice(toIndex, 0, movedRow);

        setRowData(newData);
    };

    return (
        <div
            className="ag-theme-alpine"
            style={{ height: "400px", width: "600px" }}
            data-testid="ag-grid-container"
        >
            <AgGridReact<RowData>
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                rowDragManaged={false}
                onRowDragEnd={onRowDragEnd}
            />
        </div>
    );
};

export default ManualDraggableAgGrid;
