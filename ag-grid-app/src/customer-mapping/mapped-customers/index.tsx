import { Typography } from "@mui/material";
import { ICustomer } from "../types.def";

export interface IChildCustomersDisplayProps {
  parent?: ICustomer;
  children?: ICustomer[];
}

const ChildCustomersDisplay = ({ parent }: IChildCustomersDisplayProps) => {
  return (
    <>
      <Typography variant="h5">
        Customers mapped to the parent: {parent?.name}
      </Typography>
    </>
  );
};

export default ChildCustomersDisplay;
