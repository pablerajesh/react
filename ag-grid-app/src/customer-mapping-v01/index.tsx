import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useCallback, useEffect, useState } from "react";
import {
  getChildCustomersFromBackend,
  getOrphanCustomersFromBackend,
  getParentCustomersFromBackend
} from "../customer-mapping-common/service";
import { ICustomer } from "../customer-mapping-common/types.def";
import ChildCustomersDisplay from "./child-customers";
import OrphanCustomersDisplay from "./orphan-customers";
import ParentCustomersAutocomplete from "./ParentCustomersAutocomplete";

const CustomerMapping = () => {
  const [orphanCustomers, setOrphanCustomers] = useState<
      ICustomer[] | undefined
    >(undefined),
    [parents, setParents] = useState<ICustomer[]>([]),
    [selectedParentCustomer, setSelectedParentCustomer] = useState<
      ICustomer | undefined
    >(undefined),
    [childCustomersOfSelectedParent, setChildCustomersOfSelectedParent] =
      useState<ICustomer[] | undefined>(undefined),
    [selectedOrphanCustomers, setSelectedOrphanCustomers] = useState<
      ICustomer[]
    >([]);

  useEffect(() => {
    getOrphanCustomersFromBackend().then(orphanCustomers => {
      setOrphanCustomers(orphanCustomers);
    });

    getParentCustomersFromBackend().then(parentCustomers => {
      setParents(parentCustomers);
    });
  }, []);

  const handleParentChange = (selectedParentId: number | undefined): void => {
    if (selectedParentId === undefined) {
      setSelectedParentCustomer(undefined);
      setChildCustomersOfSelectedParent([]);
      return;
    }

    const selectedParent: ICustomer | undefined = parents.find(
      parent => parent.id === selectedParentId
    );
    setSelectedParentCustomer(selectedParent);

    getChildCustomersFromBackend(selectedParentId).then(childCustomers => {
      setChildCustomersOfSelectedParent(childCustomers);
    });
  };

  const parentCustomerSelected = (): boolean =>
    selectedParentCustomer !== undefined;

  const atLeastOneOrphanCustomerSelected = (): boolean =>
    selectedOrphanCustomers.length > 0;

  const enableOrphaCustomerAdd = (): boolean =>
    parentCustomerSelected() && atLeastOneOrphanCustomerSelected();

  const handleOrphanCustomerSelectionChange = useCallback(
    (selectedOrphanCustomers: ICustomer[]) => {
      setSelectedOrphanCustomers(selectedOrphanCustomers);
    },
    []
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid size={6}>
          <ParentCustomersAutocomplete
            parentCustomers={parents}
            onParentCustomerChange={handleParentChange}
          />
        </Grid>
        <Grid
          size={6}
          container
          direction="row"
          justifyContent="flex-start"
          alignContent={"flex-end"}
        >
          <Button variant="text" size="small">
            Add new parent
          </Button>
        </Grid>

        <Grid size={6} border={1} borderColor={"#e0e0e0"}>
          <ChildCustomersDisplay
            parentCustomer={selectedParentCustomer}
            childCustomers={childCustomersOfSelectedParent}
          />
        </Grid>
        <Grid size={6} border={1} borderColor={"#e0e0e0"}>
          <OrphanCustomersDisplay
            orphanCustomers={orphanCustomers}
            onOrphanCustomerSelectionChange={
              handleOrphanCustomerSelectionChange
            }
          />
        </Grid>

        <Grid size={6} container justifyContent={"flex-end"}>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            endIcon={<KeyboardDoubleArrowRightIcon />}
          >
            Remove
          </Button>
        </Grid>
        <Grid size={6} container justifyContent={"flex-start"}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            startIcon={<KeyboardDoubleArrowLeftIcon />}
            disabled={!enableOrphaCustomerAdd()}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerMapping;
