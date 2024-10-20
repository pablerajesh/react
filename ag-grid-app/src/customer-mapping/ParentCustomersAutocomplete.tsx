import { Autocomplete, TextField } from "@mui/material";
import { useMemo } from "react";
import { getCustomerAutocompleteOptions } from "./service";
import { ICustomer } from "./types.def";

export interface PasrentCustomersAutocompleteProps {
  parentCustomers: ICustomer[];
}

const ParentCustomersAutocomplete = ({
  parentCustomers
}: PasrentCustomersAutocompleteProps) => {
  const options = useMemo(() => {
    return getCustomerAutocompleteOptions(parentCustomers);
  }, [parentCustomers]);

  return (
    <Autocomplete
      options={options}
      sx={{ width: "100%" }}
      renderInput={params => <TextField {...params} label="Parent Customer" />}
      onChange={(_, value) => console.log(value)}
    />
  );
};

export default ParentCustomersAutocomplete;
