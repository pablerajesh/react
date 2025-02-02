import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import CustomerForm from "./CustomerForm";
import {
  IFormValues,
  initialAlternateCustomers,
  initialCustomers
} from "./types.def";

const CustomerFormContainer = () => {
  const [initialValues, setInitialValues] = useState<IFormValues>({
    customers: initialCustomers
  });

  return (
    <Box>
      <Typography variant="h4">CUSTOMERS</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomerForm initialValues={initialValues} />
        </Grid>
        <Grid item xs={4} display={"flex"} justifyContent={"right"}>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              setInitialValues({
                customers: initialAlternateCustomers
              })
            }
          >
            Change Initial Values
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerFormContainer;
