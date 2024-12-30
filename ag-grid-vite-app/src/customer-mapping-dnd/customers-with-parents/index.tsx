import {
    CellClassParams,
    ColDef,
    GetDataPath,
    GridApi,
    GridReadyEvent,
    IRowNode,
    RowDragCallbackParams,
    RowDragEndEvent,
    RowDragLeaveEvent,
    RowDragMoveEvent
} from "ag-grid-community";
import {
    customerDefaultCollDef,
    ICustomerHierarchy
} from "../../common/types.def";
import { Container, Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { useState, useMemo, useEffect, useCallback } from "react";

export interface CustomersWithParentsDisplayProp {
    customerHierarchies?: ICustomerHierarchy[];
    gridContainerRef: React.MutableRefObject<HTMLDivElement | null>;
    onGridReady: (event: GridReadyEvent) => void;
    onRowDragEnd: (event: RowDragEndEvent) => void;
}

let potentialParentNode: IRowNode<ICustomerHierarchy> | null = null;
let cellClassRules = {
    "hover-over": (params: CellClassParams) =>
        params.node === potentialParentNode
};

const setPotentialParentNode = (
    api: GridApi,
    overNode: IRowNode | undefined | null
) => {
    debugger;

    const newPotentialParent: IRowNode<ICustomerHierarchy> | null = overNode
        ? getNewPotentialParentNode(overNode)
        : null;

    const alreadySelected = potentialParentNode === newPotentialParent;
    if (alreadySelected) return;

    const rowsToRefresh: IRowNode<ICustomerHierarchy>[] = [];
    if (potentialParentNode) rowsToRefresh.push(potentialParentNode);
    if (newPotentialParent) rowsToRefresh.push(newPotentialParent);

    potentialParentNode = newPotentialParent;
    refreshRows(api, rowsToRefresh);
};

const getNewPotentialParentNode = (
    overNode: IRowNode<ICustomerHierarchy>
): IRowNode<ICustomerHierarchy> | null =>
    (overNode.data as ICustomerHierarchy).isParent === true
        ? overNode
        : overNode.parent;

const refreshRows = (
    api: GridApi,
    rowsToRefresh: IRowNode<ICustomerHierarchy>[]
): void => {
    api.refreshCells({
        rowNodes: rowsToRefresh,
        force: true
    });
};

export const CustomersWithParentsDisplay = ({
    customerHierarchies,
    gridContainerRef,
    onGridReady,
    onRowDragEnd
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
            flex: 2,
            cellClassRules: cellClassRules
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
            },
            rowDrag: (params: RowDragCallbackParams) =>
                !(params.data as ICustomerHierarchy).isParent,
            cellClassRules: cellClassRules
        };
    }, []);
    const getDataPath = useMemo<GetDataPath>(
        () => (data: ICustomerHierarchy) => data.path,
        []
    );

    useEffect(() => {
        setRowData(customerHierarchies);
    }, [customerHierarchies]);

    const onRowDragMove = useCallback((event: RowDragMoveEvent) => {
        setPotentialParentNode(event.api, event.overNode);
    }, []);

    const onRowDragLeave = useCallback((event: RowDragLeaveEvent) => {
        setPotentialParentNode(event.api, event.overNode);
    }, []);

    const handleRowDragEnd = (event: RowDragEndEvent): void => {
        onRowDragEnd(event);
        setPotentialParentNode(event.api, null);
    };

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
                ref={gridContainerRef}
            >
                <AgGridReact
                    gridId="parents-children-grid"
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    autoGroupColumnDef={autoGroupColumnDef}
                    treeData={true}
                    animateRows={true}
                    groupDefaultExpanded={0}
                    rowSelection={"multiple"}
                    rowDragManaged={false}
                    rowDragMultiRow={true}
                    suppressMoveWhenRowDragging={true}
                    suppressRowClickSelection={true}
                    getDataPath={getDataPath}
                    onGridReady={onGridReady}
                    onRowDragEnd={handleRowDragEnd}
                    onRowDragMove={onRowDragMove}
                    onRowDragLeave={onRowDragLeave}
                />
            </div>
        </Container>
    );
};

export default CustomersWithParentsDisplay;
