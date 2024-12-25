import { Container, Typography } from "@mui/material";
import { ColDef, GridReadyEvent, RowDragEnterEvent } from "ag-grid-community";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useState } from "react";
import {
    ICustomer,
    customerColDefs,
    customerDefaultCollDef
} from "../../common/types.def";

export interface IOrphanCustomersDisplayProps {
    orphanCustomers: ICustomer[] | undefined;
    gridContainerRef: React.MutableRefObject<HTMLDivElement | null>;
    onGridReady: (event: GridReadyEvent) => void;
    onRowDragEnter: (event: RowDragEnterEvent) => void;
}

export const OrphanCustomersDisplay = ({
    orphanCustomers,
    gridContainerRef,
    onGridReady,
    onRowDragEnter
}: IOrphanCustomersDisplayProps) => {
    const defaultColDef = useMemo<ColDef<ICustomer>>(
        () => customerDefaultCollDef,
        []
    );
    const [columnDefs] = useState<ColDef<ICustomer>[]>(customerColDefs);
    const [rowData, setRowData] = useState<ICustomer[] | undefined>(
        orphanCustomers
    );

    useEffect(() => {
        setRowData(orphanCustomers);
    }, [orphanCustomers]);

    return (
        <Container sx={{ mt: 2 }}>
            <Typography variant="h5">ORPHAN CUSTOMERS</Typography>
            <div
                id="orphan-customers-grid-container"
                className={"ag-theme-material"}
                style={{
                    height: "90vh",
                    minHeight: "90vh",
                    width: "100%"
                }}
                ref={gridContainerRef}
            >
                <AgGridReact
                    gridId="orphan-customers-grid"
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowSelection={"multiple"}
                    rowDragManaged={true}
                    rowDragMultiRow={true}
                    suppressMoveWhenRowDragging={true}
                    animateRows={true}
                    overlayNoRowsTemplate="No orphan customers to display..."
                    onGridReady={onGridReady}
                    onRowDragEnter={onRowDragEnter}
                />
            </div>
        </Container>
    );
};

export default OrphanCustomersDisplay;
