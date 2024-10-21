import { Autocomplete, TextField } from "@mui/material";
import { useMemo } from "react";
import { getCustomerAutocompleteOptions } from "../customer-mapping-common/service";
import { ICustomer } from "../customer-mapping-common/types.def";

export interface PasrentCustomersAutocompleteProps {
  parentCustomers: ICustomer[];
  onParentCustomerChange: (selectedParentId: number | undefined) => void;
}

const ParentCustomersAutocomplete = ({
  parentCustomers: parents,
  onParentCustomerChange
}: PasrentCustomersAutocompleteProps) => {
  const options = useMemo(() => {
    return getCustomerAutocompleteOptions(parents);
  }, [parents]);

  return (
    <Autocomplete
      options={options}
      sx={{ width: "100%" }}
      renderInput={params => <TextField {...params} label="Parent Customer" />}
      onChange={(_, value) => onParentCustomerChange(value?.id)}
    />
  );
};

export default ParentCustomersAutocomplete;
