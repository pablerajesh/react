import { Container, Typography } from "@mui/material";
import {
    CellClassParams,
    ColDef,
    GetDataPath,
    GridApi,
    GridReadyEvent,
    IRowNode,
    RefreshCellsParams,
    RowDragCallbackParams,
    RowDragEndEvent,
    RowDragLeaveEvent,
    RowDragMoveEvent
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    customerDefaultCollDef,
    ICustomerHierarchy
} from "../../common/types.def";

export interface CustomersWithParentsDisplayProp {
    customerHierarchies?: ICustomerHierarchy[];
    gridContainerRef: React.MutableRefObject<HTMLDivElement | null>;
    onGridReady: (event: GridReadyEvent) => void;
    onRowDragEnd: (event: RowDragEndEvent) => void;
}

let potentialParent: any = null;
let cellClassRules = {
    "hover-over": (params: CellClassParams) => {
        return params.node === potentialParent;
    }
};

const setPotentialParentForNode = (
    api: GridApi,
    overNode: IRowNode | undefined | null
) => {
    let newPotentialParent;
    debugger;
    if (overNode) {
        newPotentialParent =
            overNode.data.isParent === true ? overNode : overNode.parent;
    } else {
        newPotentialParent = null;
    }
    const alreadySelected = potentialParent === newPotentialParent;
    if (alreadySelected) {
        return;
    }
    // we refresh the previous selection (if it exists) to clear
    // the highlighted and then the new selection.
    const rowsToRefresh = [];
    if (potentialParent) {
        rowsToRefresh.push(potentialParent);
    }
    if (newPotentialParent) {
        rowsToRefresh.push(newPotentialParent);
    }
    potentialParent = newPotentialParent;
    refreshRows(api, rowsToRefresh);
};

function refreshRows(api: GridApi, rowsToRefresh: IRowNode[]) {
    let params: RefreshCellsParams = {
        rowNodes: rowsToRefresh,
        force: true
    };
    api.refreshCells(params);
}

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
        setPotentialParentForNode(event.api, event.overNode);
    }, []);

    const onRowDragLeave = useCallback((event: RowDragLeaveEvent) => {
        setPotentialParentForNode(event.api, event.overNode);
    }, []);

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
                    groupDefaultExpanded={-1}
                    rowSelection={"multiple"}
                    rowDragManaged={false}
                    rowDragMultiRow={true}
                    suppressMoveWhenRowDragging={true}
                    suppressRowClickSelection={true}
                    getDataPath={getDataPath}
                    onGridReady={onGridReady}
                    onRowDragEnd={onRowDragEnd}
                    onRowDragMove={onRowDragMove}
                    onRowDragLeave={onRowDragLeave}
                />
            </div>
        </Container>
    );
};

export default CustomersWithParentsDisplay;
