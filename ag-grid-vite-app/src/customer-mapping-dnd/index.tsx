import Grid from "@mui/material/Grid2";

import { Box } from "@mui/material";
import { GridApi, GridReadyEvent, RowDragEndEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useEffect, useRef, useState } from "react";
import {
    getCustomerHierarchies,
    getOrphanCustomersFromBackend
} from "../common/service";
import {
    IAddedHierarchies,
    ICustomer,
    ICustomerHierarchy,
    IRemovedOrphan
} from "../common/types.def";
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
    const [addedHierarchies, setAddedHierarchies] = useState<
        IAddedHierarchies[]
    >([]);
    const [removedOrphans, setRemovedOrphans] = useState<IRemovedOrphan[]>([]);

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
            parentChildGridApi.addRowDropZone(
                orphansGridApi.getRowDropZoneParams()
            );
        }
    }, [parentChildGridApi, orphansGridApi]);

    useEffect(() => {
        console.log("[rp] addedHierarchies", addedHierarchies);
        console.log("[rp] removedOrphans", removedOrphans);
    }, [addedHierarchies, removedOrphans]);

    const handleParentChildGridReady = (event: GridReadyEvent): void => {
        setParentChildGridApi(event.api);
    };

    const handleOrphansGridReady = (event: GridReadyEvent): void => {
        setOrphansGridApi(event.api);
    };

    const handleOrphansDroppedOnCusotmerHierarchies = (
        event: RowDragEndEvent
    ): void => {
        const overNodeIndex: number = event.overIndex;
        if (overNodeIndex === 0) return;

        const lastRowNode = parentChildGridApi!.getDisplayedRowAtIndex(
            parentChildGridApi!.getLastDisplayedRow()
        );
        const parentNodeDroppedInside =
            overNodeIndex === -1 ? lastRowNode : event.overNode;
        const orphansDropped: ICustomer[] = event.nodes.map(
            node => node.data as ICustomer
        );

        if (orphansDropped.length > 0 && parentNodeDroppedInside) {
            const parentDroppedInside = parentNodeDroppedInside.parent
                ?.data as ICustomerHierarchy;

            addAsChildren(orphansDropped, parentDroppedInside);
            removeFromOrphans(orphansDropped);
        }
    };

    const addAsChildren = (
        orphansDropped: ICustomer[],
        parentDroppedInside: ICustomerHierarchy
    ): void => {
        const nextAddedHierarchies: IAddedHierarchies[] =
            addedHierarchies.concat(
                orphansDropped.map(o => ({
                    parentId: parentDroppedInside.id,
                    childId: o.id
                }))
            );
        setAddedHierarchies(nextAddedHierarchies);

        const newCustomerHierarchies = orphansDropped.map((o: ICustomer) => {
            const customerHierarchy: ICustomerHierarchy = {
                ...o,
                path: [parentDroppedInside.name, o.name]
            };
            return customerHierarchy;
        });
        const nextCustomerHierarchies: ICustomerHierarchy[] =
            customerHierarchies!
                .concat(newCustomerHierarchies)
                .sort((a, b) => a.id - b.id);
        setCustomerHierarchies(nextCustomerHierarchies);
    };

    const removeFromOrphans = (orphansDropped: ICustomer[]): void => {
        const orphansDroppedIds: number[] = orphansDropped.map(o => o.id);
        const nextRemovedOrphans: IRemovedOrphan[] = removedOrphans.concat(
            orphansDroppedIds.map(i => ({
                id: i
            }))
        );
        setRemovedOrphans(nextRemovedOrphans);

        const updatedOrphanCustomers: ICustomer[] = orphanCustomers!
            .filter(o => !orphansDroppedIds.includes(o.id))
            .sort((a, b) => a.id - b.id);
        setOrphanCustomers(updatedOrphanCustomers);
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
                        onRowDragEnd={handleOrphansDroppedOnCusotmerHierarchies}
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
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default CustomerMappingDnd;
