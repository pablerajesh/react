import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
    GridApi,
    GridReadyEvent,
    RowDragEndEvent,
    RowDragEnterEvent
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useEffect, useRef, useState } from "react";
import {
    getCustomerHierarchies,
    getOrphanCustomersFromBackend
} from "../common/service";
import { ICustomer, ICustomerHierarchy } from "../common/types.def";
import CustomersWithParentsDisplay from "./customers-with-parents";
import OrphanCustomersDisplay from "./orphan-customers";

const CustomerMappingDnd = () => {
    const [customerHierarchies, setCustomerHierarchies] = useState<
        ICustomerHierarchy[] | undefined
    >(undefined);
    const [orphanCustomers, setOrphanCustomers] = useState<
        ICustomer[] | undefined
    >(undefined);
    const parentChildGridContainrRef = useRef<HTMLDivElement | null>(null);
    const [parentChildGridApi, setParentChildGridApi] =
        useState<GridApi | null>(null);
    const orphansGridContainrRef = useRef<HTMLDivElement | null>(null);
    const [orphansGridApi, setOrphansGridApi] = useState<GridApi | null>(null);

    useEffect(() => {
        getCustomerHierarchies().then(customerHierarchies => {
            setCustomerHierarchies(customerHierarchies);
        });

        getOrphanCustomersFromBackend().then(orphanCustomers => {
            setOrphanCustomers(orphanCustomers);
        });
    }, []);

    useEffect(() => {
        if (parentChildGridApi && orphansGridApi) {
            orphansGridApi.addRowDropZone(
                parentChildGridApi.getRowDropZoneParams()
            );
            orphansGridApi.removeRowDropZone(
                orphansGridApi.getRowDropZoneParams()
            );
        }
    }, [parentChildGridApi, orphansGridApi]);

    const handleParentChildGridReady = (event: GridReadyEvent): void => {
        setParentChildGridApi(event.api);
    };

    const handleOrphansGridReady = (event: GridReadyEvent): void => {
        setOrphansGridApi(event.api);
    };

    const onOrphanCustomersGridRowDragEnter = (
        _event: RowDragEnterEvent
    ): void => {
        console.log("[rp] onOrphanCustomersGridRowDragEnter");
    };

    const onParentChildrenGridRowDragEnd = (_event: RowDragEndEvent): void => {
        console.log("[rp] onParentChildrenGridRowDragEnd");
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                spacing={2}
                sx={{ p: 2 }}
            >
                <Grid
                    size={6}
                    border={1}
                    borderColor={"#e0e0e0"}
                >
                    <CustomersWithParentsDisplay
                        customerHierarchies={customerHierarchies}
                        gridContainerRef={parentChildGridContainrRef}
                        onGridReady={handleParentChildGridReady}
                        onRowDragEnd={onParentChildrenGridRowDragEnd}
                    />
                </Grid>
                <Grid
                    size={6}
                    border={1}
                    borderColor={"#e0e0e0"}
                >
                    <OrphanCustomersDisplay
                        orphanCustomers={orphanCustomers}
                        gridContainerRef={orphansGridContainrRef}
                        onGridReady={handleOrphansGridReady}
                        onRowDragEnter={onOrphanCustomersGridRowDragEnter}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default CustomerMappingDnd;
