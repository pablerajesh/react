import { ICustomer } from "./types.def";

const persistedCustomers: ICustomer[] = Array.from({ length: 10 }, (_, i) => {
  const id = i + 1,
    isParent = id === 1,
    parentId = [2, 3, 4, 5].includes(id) ? 1 : undefined,
    isOrphan = parentId === undefined;

  return {
    id: id,
    name: `Customer ${i + 1}`,
    isParent: isParent,
    parentId: parentId,
    isOrphan: isOrphan
  };
});

export const getParentCustomersFromBackend = () => {
  const parentCustomers: ICustomer[] = persistedCustomers.filter(
    customer => customer.isParent
  );
  return new Promise<ICustomer[]>(resolve => {
    setTimeout(() => {
      resolve(parentCustomers);
    }, 1000);
  });
};

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
