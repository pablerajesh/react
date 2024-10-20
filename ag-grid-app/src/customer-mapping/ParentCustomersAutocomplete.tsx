import { Autocomplete, TextField } from "@mui/material";
import { useMemo } from "react";
import { getCustomerAutocompleteOptions } from "./service";
import { ICustomer } from "./types.def";

export interface PasrentCustomersAutocompleteProps {
  parents: ICustomer[];
  onParentChange: (selectedParentId: number | undefined) => void;
}

const ParentCustomersAutocomplete = ({
  parents,
  onParentChange
}: PasrentCustomersAutocompleteProps) => {
  const options = useMemo(() => {
    return getCustomerAutocompleteOptions(parents);
  }, [parents]);

  return (
    <Autocomplete
      options={options}
      sx={{ width: "100%" }}
      renderInput={params => <TextField {...params} label="Parent Customer" />}
      onChange={(_, value) => onParentChange(value?.id)}
    />
  );
};

export default ParentCustomersAutocomplete;
