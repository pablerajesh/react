import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useEffect, useState } from "react";
import { getCustomerHierarchies, getOrphanCustomersFromBackend } from "../common/service";
import { ICustomer, ICustomerHierarchy } from "../common/types.def";
import CustomersWithParentsDisplay from "./customers-with-parents";
import OrphanCustomersDisplay from "./orphan-customers";

const CustomerMappingDnd = () => {
  const [, setCustomerHierarchies] = useState<ICustomerHierarchy[] | undefined>([]);
  const [orphanCustomers, setOrphanCustomers] = useState<ICustomer[] | undefined>(undefined);

  useEffect(() => {
    getCustomerHierarchies().then(customerHierarchies => {
      setCustomerHierarchies(customerHierarchies);
    });

    getOrphanCustomersFromBackend().then(orphanCustomers => {
      setOrphanCustomers(orphanCustomers);
    });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid size={6} border={1} borderColor={"#e0e0e0"}>
          <CustomersWithParentsDisplay />
        </Grid>
        <Grid size={6} border={1} borderColor={"#e0e0e0"}>
          <OrphanCustomersDisplay orphanCustomers={orphanCustomers} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerMappingDnd;
