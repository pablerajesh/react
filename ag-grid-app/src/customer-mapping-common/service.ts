import { ICustomer, ICustomerAutocompleteOption } from "./types.def";

const totalCustomers: number = 100,
  slot: number = 10;

const isParentCustomer = (id: number) => id - 1 === 0 || (id - 1) % slot === 0;

const getParentCustomerId = (id: number) => {
  const parentId = id - (id % slot) + 1,
    lastDigit = id % 10;
  if ([2, 3, 4, 5].includes(lastDigit)) return parentId;
  return undefined;
};

const persistedCustomers: ICustomer[] = Array.from(
  { length: totalCustomers },
  (_, i) => {
    const id = i + 1,
      isParent: boolean = isParentCustomer(id),
      parentId: number | undefined = getParentCustomerId(id),
      isOrphan: boolean = parentId === undefined;

    return {
      id: id,
      code: `CUST-${i + 1}`,
      name: `Customer ${i + 1}`,
      isParent: isParent,
      parentId: parentId,
      isOrphan: isOrphan
    };
  }
);

export const getOrphanCustomersFromBackend = (): Promise<ICustomer[]> => {
  const orphanCustomers: ICustomer[] = persistedCustomers.filter(
    customer => customer.parentId === undefined && !customer.isParent
  );
  return new Promise<ICustomer[]>(resolve => {
    setTimeout(() => {
      resolve(orphanCustomers);
    }, 0);
  });
};

export const getParentCustomersFromBackend = (): Promise<ICustomer[]> => {
  const parentCustomers: ICustomer[] = persistedCustomers.filter(
    customer => customer.isParent
  );
  return new Promise<ICustomer[]>(resolve => {
    setTimeout(() => {
      resolve(parentCustomers);
    }, 0);
  });
};

export const getChildCustomersFromBackend = (
  parentId: number
): Promise<ICustomer[]> => {
  const childCustomers: ICustomer[] = persistedCustomers.filter(
    customer => customer.parentId === parentId
  );
  return new Promise<ICustomer[]>(resolve => {
    setTimeout(() => {
      resolve(childCustomers);
    }, 0);
  });
};

export const getCustomerAutocompleteOptions = (
  customers: ICustomer[]
): ICustomerAutocompleteOption[] =>
  customers.map(customer => {
    const option: ICustomerAutocompleteOption = {
      id: customer.id,
      name: customer.name,
      label: customer.name
    };
    return option;
  });
