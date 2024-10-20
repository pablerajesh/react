import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from "react";
import MappedCustomersDisplay from "./mapped-customers";
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
    if (selectedParentId !== undefined) {
      const selectedParent: ICustomer | undefined = parents.find(
        parent => parent.id === selectedParentId
      );
      setSelectedParent(selectedParent);

      getChildCustomersFromBackend(selectedParentId).then(childCustomers => {
        setChildrenOfSelectedParent(childCustomers);
      });
    }
  };

  return (
    <Container sx={{ mt: 5, p: 5 }} maxWidth={false}>
      <Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 6, md: 6 }}>First</Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <ParentCustomersAutocomplete
              parents={parents}
              onParentChange={handleParentChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid size={{ xs: 6, md: 6 }}>
            <OrphanCustomersDisplay orphans={orphanCustomers} />
          </Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <MappedCustomersDisplay
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
