import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useEffect, useState } from "react";
import ChildCustomersDisplay from "./child-customers";
import OrphanCustomersDisplay from "./orphan-customers";
import ParentCustomersAutocomplete from "./ParentCustomersAutocomplete";
import {
  getChildCustomersFromBackend,
  getOrphanCustomersFromBackend,
  getParentCustomersFromBackend
} from "./service";
import { ICustomer } from "./types.def";

const CustomerMapping = () => {
  const [orphanCustomers, setOrphanCustomers] = useState<
    ICustomer[] | undefined
  >(undefined);
  const [parents, setParents] = useState<ICustomer[]>([]),
    [selectedParentCustomer, setSelectedParentCustomer] = useState<
      ICustomer | undefined
    >(undefined),
    [childCustomersOfSelectedParent, setChildCustomersOfSelectedParent] =
      useState<ICustomer[] | undefined>(undefined);

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

  return (
    <Container sx={{ mt: 5, p: 5 }} maxWidth={false}>
      <Box>
        <Grid container spacing={5}>
          <Grid size={{ xs: 6, md: 6 }}></Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <ParentCustomersAutocomplete
              parentCustomers={parents}
              onParentCustomerChange={handleParentChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={5} sx={{ mt: 3 }}>
          <Grid size={{ xs: 6, md: 6 }} border={1} borderColor={"#e0e0e0"}>
            <OrphanCustomersDisplay orphanCustomers={orphanCustomers} />
          </Grid>
          <Grid size={{ xs: 6, md: 6 }} border={1} borderColor={"#e0e0e0"}>
            <ChildCustomersDisplay
              parentCustomer={selectedParentCustomer}
              childCustomers={childCustomersOfSelectedParent}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CustomerMapping;
