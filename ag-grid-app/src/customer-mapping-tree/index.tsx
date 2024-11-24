import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { mockCustomerHierarchies } from "../ag-grid-tree/data";
import { ICustomerHierarchy } from "../customer-mapping-common/types.def";
import CustomersWithParentsDisplay from "./customers-with-parents";

const CustomerMapping = () => {
  const [customerHierarchies, setCustomerHierarchies] = useState<
    ICustomerHierarchy[] | undefined
  >([]);

  useEffect(() => {
    setCustomerHierarchies(mockCustomerHierarchies);
    // getCustomerHierarchies().then(customerHierarchies => {
    //   setCustomerHierarchies(customerHierarchies);
    // });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid size={6} border={1} borderColor={"#e0e0e0"}>
          <CustomersWithParentsDisplay
            customerHierarchies={customerHierarchies}
          />
        </Grid>
        <Grid size={6} border={1} borderColor={"#e0e0e0"}>
          Right
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerMapping;
