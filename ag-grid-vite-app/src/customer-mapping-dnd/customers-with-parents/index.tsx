import { Container, Typography } from "@mui/material";
import {
    CellClassParams,
    CellClassRules,
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

let potentialParentRowNode: IRowNode<ICustomerHierarchy> | null = null;
const potentialParentNodeHighlighterCssRule: CellClassRules<
    ICustomerHierarchy,
    any
> = {
    "hover-over": (params: CellClassParams) =>
        params.node === potentialParentRowNode
};

const setPotentialParentRowNode = (
    api: GridApi,
    overNode: IRowNode | undefined | null
) => {
    const newPotentialParentRowNode: IRowNode<ICustomerHierarchy> | null =
        overNode ? getNewPotentialParentRowNode(overNode) : null;

    const alreadySelected =
        potentialParentRowNode === newPotentialParentRowNode;
    if (alreadySelected) return;

    const rowNodesToRefresh: IRowNode<ICustomerHierarchy>[] = [];
    if (potentialParentRowNode) rowNodesToRefresh.push(potentialParentRowNode);
    if (newPotentialParentRowNode)
        rowNodesToRefresh.push(newPotentialParentRowNode);

    potentialParentRowNode = newPotentialParentRowNode;
    forceRefreshRowNodesToHighlight(api, rowNodesToRefresh);
};

const getNewPotentialParentRowNode = (
    overNode: IRowNode<ICustomerHierarchy>
): IRowNode<ICustomerHierarchy> | null =>
    (overNode.data as ICustomerHierarchy).isParent === true
        ? overNode
        : overNode.parent;

const forceRefreshRowNodesToHighlight = (
    gridApi: GridApi,
    rowNodesToRefresh: IRowNode<ICustomerHierarchy>[]
): void => {
    gridApi.refreshCells({
        rowNodes: rowNodesToRefresh,
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
            cellClassRules: potentialParentNodeHighlighterCssRule
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
            rowDrag: (params: RowDragCallbackParams): boolean =>
                !(params.data as ICustomerHierarchy).isParent,
            cellClassRules: potentialParentNodeHighlighterCssRule
        };
    }, []);
    const getDataPath = useMemo<GetDataPath>(
        () =>
            (data: ICustomerHierarchy): string[] =>
                data.path,
        []
    );

    useEffect(() => {
        setRowData(customerHierarchies);
    }, [customerHierarchies]);

    const handleRowDragMove = useCallback((event: RowDragMoveEvent): void => {
        setPotentialParentRowNode(event.api, event.overNode);
    }, []);

    const handleRowDragLeave = useCallback((event: RowDragLeaveEvent): void => {
        setPotentialParentRowNode(event.api, event.overNode);
    }, []);

    const handleRowDragEnd = (event: RowDragEndEvent): void => {
        onRowDragEnd(event);
        setPotentialParentRowNode(event.api, null);
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
                    groupDefaultExpanded={-1}
                    rowSelection={"multiple"}
                    rowDragManaged={false}
                    rowDragMultiRow={true}
                    suppressMoveWhenRowDragging={true}
                    suppressRowClickSelection={true}
                    getDataPath={getDataPath}
                    onGridReady={onGridReady}
                    onRowDragEnd={handleRowDragEnd}
                    onRowDragMove={handleRowDragMove}
                    onRowDragLeave={handleRowDragLeave}
                />
            </div>
        </Container>
    );
};

export default CustomersWithParentsDisplay;
