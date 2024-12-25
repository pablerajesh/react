import { Container, Typography } from "@mui/material";
import { ColDef, GetDataPath } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState } from "react";
import {
    customerDefaultCollDef,
    ICustomerHierarchy
} from "../../common/types.def";

export interface CustomersWithParentsDisplayProp {
    customerHierarchies?: ICustomerHierarchy[];
}

export const CustomersWithParentsDisplay = ({
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
            field: "name",
            headerName: "NAME",
            minWidth: 300,
            cellRendererParams: {
                suppressCount: true,
                checkbox: true
            }
        };
    }, []);
    const getDataPath = useMemo<GetDataPath>(
        () => (data: ICustomerHierarchy) => data.path,
        []
    );

    useEffect(() => {
        setRowData(customerHierarchies);
    }, [customerHierarchies]);

    return (
        <Container sx={{ mt: 2 }}>
            <Typography variant="h5">PARENT & CHILD CUSTOMERS</Typography>
            <div
                id="customers-tree-grid-container"
                className={"ag-theme-material"}
                style={{
                    height: "90vh",
                    minHeight: "90vh",
                    width: "100%"
                }}
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    autoGroupColumnDef={autoGroupColumnDef}
                    treeData={true}
                    animateRows={true}
                    groupDefaultExpanded={-1}
                    rowSelection={"multiple"}
                    suppressRowClickSelection={true}
                    getDataPath={getDataPath}
                />
            </div>
        </Container>
    );
};

export default CustomersWithParentsDisplay;
