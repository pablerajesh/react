import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import CustomersWithParentsDisplay from "./customers-with-parents";

const CustomerMapping = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid size={6} border={1} borderColor={"#e0e0e0"}>
          <CustomersWithParentsDisplay />
        </Grid>
        <Grid size={6} border={1} borderColor={"#e0e0e0"}>
          Right
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerMapping;
