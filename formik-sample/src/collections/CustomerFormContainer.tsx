import { useEffect, useState } from "react";
import CustomersForm from "./CustomersForm";
import { ICustomer, initialCustomers } from "./types.def";

const CustomerFormContainer = () => {
  const [customers, setCustomers] = useState<ICustomer[] | undefined>(
    undefined
  );

  useEffect(() => {
    setTimeout(() => {
      setCustomers(initialCustomers);
    }, 3000);
  }, []);

  return (
    <div>
      <p>Customers length: {customers?.length} </p>
      <CustomersForm customers={customers} />
    </div>
  );
};
export default CustomerFormContainer;
