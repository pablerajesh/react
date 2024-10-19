import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from "react";
import OrphanCustomersDisplay from "./orphan-customers";
import { getOrphanCustomersFromBackend } from "./service";
import { ICustomer } from "./types.def";

const CustomerMapping = () => {
  const [orphanCustomers, setOrphanCustomers] = useState<
    ICustomer[] | undefined
  >(undefined);

  useEffect(() => {
    getOrphanCustomersFromBackend().then(orphanCustomers => {
      setOrphanCustomers(orphanCustomers);
    });
  }, []);

  return (
    <Container sx={{ mt: 5, p: 5 }} maxWidth={false}>
      <Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 6, md: 6 }}>
            <Typography variant="h5">Orphan customers</Typography>
            <OrphanCustomersDisplay orphanCustomers={orphanCustomers} />
          </Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <Typography variant="h5">Mapped customers</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CustomerMapping;
