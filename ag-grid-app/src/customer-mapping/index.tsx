import { Box, Container, Typography } from "@mui/material";
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
  getOrphanCustomersFromBackend,
  getParentCustomersFromBackend
} from "./service";
import { ICustomer } from "./types.def";

const CustomerMapping = () => {
  const [orphanCustomers, setOrphanCustomers] = useState<
    ICustomer[] | undefined
  >(undefined);
  const [parentCustomers, setParentCustomers] = useState<ICustomer[]>([]),
    [, setSelectedParentId] = useState<number | undefined>(undefined);

  useEffect(() => {
    getOrphanCustomersFromBackend().then(orphanCustomers => {
      setOrphanCustomers(orphanCustomers);
    });

    getParentCustomersFromBackend().then(parentCustomers => {
      setParentCustomers(parentCustomers);
    });
  }, []);

  const handleParentCustomerChange = (
    selectedParentId: number | undefined
  ): void => setSelectedParentId(selectedParentId);

  return (
    <Container sx={{ mt: 5, p: 5 }} maxWidth={false}>
      <Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 6, md: 6 }}>First</Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <ParentCustomersAutocomplete
              parentCustomers={parentCustomers}
              onParentCustomerChange={handleParentCustomerChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid size={{ xs: 6, md: 6 }}>
            <Typography variant="h5">Orphan customers</Typography>
            <OrphanCustomersDisplay orphanCustomers={orphanCustomers} />
          </Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <Typography variant="h5">
              Customers mapped to the parent...
            </Typography>
            <MappedCustomersDisplay />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CustomerMapping;
