import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useEffect, useState } from "react";
import ChildCustomersDisplay from "./mapped-customers";
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
    [selectedParent, setSelectedParent] = useState<ICustomer | undefined>(
      undefined
    ),
    [childrenOfSelectedParent, setChildrenOfSelectedParent] = useState<
      ICustomer[] | undefined
    >(undefined);

  useEffect(() => {
    getOrphanCustomersFromBackend().then(orphanCustomers => {
      setOrphanCustomers(orphanCustomers);
    });

    getParentCustomersFromBackend().then(parentCustomers => {
      setParents(parentCustomers);
    });
  }, []);

  const handleParentChange = (selectedParentId: number | undefined): void => {
    debugger;
    if (selectedParentId === undefined) {
      setSelectedParent(undefined);
      setChildrenOfSelectedParent([]);
      return;
    }

    const selectedParent: ICustomer | undefined = parents.find(
      parent => parent.id === selectedParentId
    );
    setSelectedParent(selectedParent);

    getChildCustomersFromBackend(selectedParentId).then(childCustomers => {
      setChildrenOfSelectedParent(childCustomers);
    });
  };

  return (
    <Container sx={{ mt: 5, p: 5 }} maxWidth={false}>
      <Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 6, md: 6 }}></Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <ParentCustomersAutocomplete
              parents={parents}
              onParentChange={handleParentChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={5} sx={{ mt: 3 }}>
          <Grid size={{ xs: 6, md: 6 }} border={1} borderColor={"#e0e0e0"}>
            <OrphanCustomersDisplay orphans={orphanCustomers} />
          </Grid>
          <Grid size={{ xs: 6, md: 6 }} border={1} borderColor={"#e0e0e0"}>
            <ChildCustomersDisplay
              parent={selectedParent}
              children={childrenOfSelectedParent}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CustomerMapping;
