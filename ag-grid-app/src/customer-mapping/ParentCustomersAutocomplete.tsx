import { Autocomplete, TextField } from "@mui/material";
import { ICustomer } from "./types.def";

export interface PasrentCustomersAutocompleteProps {
  parentCustomers: ICustomer[];
}

const ParentCustomersAutocomplete = ({
  parentCustomers
}: PasrentCustomersAutocompleteProps) => {
  console.log("parentCustomers", parentCustomers);

  return (
    <Autocomplete
      disablePortal
      options={[]}
      sx={{ width: "100%" }}
      renderInput={params => <TextField {...params} label="Parent Customer" />}
    />
  );
};

export default ParentCustomersAutocomplete;
