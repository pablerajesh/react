import { Container, Typography } from "@mui/material";
import { ColDef } from "ag-grid-community";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState } from "react";
import {
    customerColDefs,
    customerDefaultCollDef,
    ICustomer
} from "../../common/types.def";

export interface IOrphanCustomersDisplayProps {
    orphanCustomers: ICustomer[] | undefined;
}

export const OrphanCustomersDisplay = ({
    orphanCustomers
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
            >
                <AgGridReact
                    gridId="orphan-customers-grid"
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowSelection={"multiple"}
                    rowDragManaged={true}
                    rowDragMultiRow={true}
                    animateRows={true}
                    overlayNoRowsTemplate="No orphan customers to display..."
                />
            </div>
        </Container>
    );
};

export default OrphanCustomersDisplay;
