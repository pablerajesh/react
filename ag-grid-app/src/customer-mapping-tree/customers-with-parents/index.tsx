import { Container, Typography } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { ICustomerHierarchy } from "../../customer-mapping-common/types.def";

export interface CustomersWithParentsDisplayProp {
  customerHierarchies?: ICustomerHierarchy[];
}

const CustomersWithParentsDisplay = ({
  customerHierarchies
}: CustomersWithParentsDisplayProp) => {
  console.log(customerHierarchies);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h5">Orphan customers</Typography>
      <div
        id="customers-tree-grid-container"
        className={"ag-theme-material"}
        style={{
          height: "70vh",
          minHeight: "70vh",
          width: "100%"
        }}
      >
        Grid goes here...
      </div>
    </Container>
  );
};

export default CustomersWithParentsDisplay;
