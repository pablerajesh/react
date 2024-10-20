import { ICustomer } from "./types.def";

const persistedCustomers: ICustomer[] = Array.from({ length: 20 }, (_, i) => {
  const id = i + 1,
    isParent = [1, 11].includes(id),
    parentId = [2, 3, 4, 5].includes(id)
      ? 1
      : [12, 13, 14, 15].includes(id)
      ? 1
      : undefined,
    isOrphan = parentId === undefined;

  return {
    id: id,
    code: `CUST-${i + 1}`,
    name: `Customer ${i + 1}`,
    isParent: isParent,
    parentId: parentId,
    isOrphan: isOrphan
  };
});

export const getOrphanCustomersFromBackend = () => {
  const orphanCustomers: ICustomer[] = persistedCustomers.filter(
    customer => customer.parentId === undefined && !customer.isParent
  );
  return new Promise<ICustomer[]>(resolve => {
    setTimeout(() => {
      resolve(orphanCustomers);
    }, 0);
  });
};

export const getParentCustomersFromBackend = () => {
  const parentCustomers: ICustomer[] = persistedCustomers.filter(
    customer => customer.isParent
  );
  return new Promise<ICustomer[]>(resolve => {
    setTimeout(() => {
      resolve(parentCustomers);
    }, 0);
  });
};
