import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useEffect, useState } from "react";
import SplitButton, { IButtonSpec } from "../components/mui/SplitButton";
import {
  getCustomerHierarchies,
  getOrphanCustomersFromBackend
} from "../customer-mapping-common/service";
import {
  ICustomer,
  ICustomerHierarchy
} from "../customer-mapping-common/types.def";
import CustomersWithParentsDisplay from "./customers-with-parents";
import OrphanCustomersDisplay from "./orphan-customers";
import "./styles.css";

const CustomerMapping = () => {
  const [customerHierarchies, setCustomerHierarchies] = useState<
      ICustomerHierarchy[] | undefined
    >([]),
    [orphanCustomers, setOrphanCustomers] = useState<ICustomer[] | undefined>(
      undefined
    ),
    [buttonSpecs] = useState<IButtonSpec[]>([
      {
        id: 1,
        text: "Add selected to existing parent",
        onClick: () => {
          console.log("[rp] Adding selected to existing parent");
        },
        props: {
          sx: { width: "22rem" },
          disabled: false
        }
      },
      {
        id: 2,
        text: "Add selected to a new parent",
        onClick: () => {
          console.log("[rp] Adding selected to a new parent");
        },
        props: {
          sx: { width: "22rem" },
          disabled: false
        }
      }
    ]);

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
          <CustomersWithParentsDisplay
            customerHierarchies={customerHierarchies}
          />
        </Grid>
        <Grid size={6} border={1} borderColor={"#e0e0e0"}>
          <OrphanCustomersDisplay orphanCustomers={orphanCustomers} />
        </Grid>
        <Grid size={6} container justifyContent={"flex-end"}>
          <Button
            size="large"
            variant="outlined"
            fullWidth={false}
            endIcon={<KeyboardDoubleArrowRightIcon />}
            sx={{ width: "22rem" }}
          >
            Remove selected children
          </Button>
        </Grid>
        <Grid size={6} container justifyContent={"flex-end"}>
          <SplitButton
            props={{
              variant: "contained",
              color: "primary",
              size: "large",
              fullWidth: false
            }}
            startIcon={<KeyboardDoubleArrowLeftIcon />}
            buttonSpecs={buttonSpecs}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerMapping;
