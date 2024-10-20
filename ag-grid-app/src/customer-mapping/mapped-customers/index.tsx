import { Typography } from "@mui/material";
import { ICustomer } from "../types.def";

export interface IMappedCustomersDisplayProps {
  parent?: ICustomer;
  children?: ICustomer[];
}

const MappedCustomersDisplay = ({ parent }: IMappedCustomersDisplayProps) => {
  return (
    <>
      <Typography variant="h5">
        Customers mapped to the parent: {parent?.name}
      </Typography>
    </>
  );
};

export default MappedCustomersDisplay;
