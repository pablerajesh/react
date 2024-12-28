import { ICustomer, ICustomerHierarchy } from "./types.def";

const totalCustomers: number = 30,
    slotSize: number = 10;

const isParentCustomer = (id: number) =>
    id - 1 === 0 || (id - 1) % slotSize === 0;

const getParentCustomerId = (id: number) => {
    const firstInTheCurrentSlot: number = id - (id % slotSize) + 1,
        lastDigitOfId = id % 10;
    if ([2, 3, 4, 5].includes(lastDigitOfId)) return firstInTheCurrentSlot;
    return undefined;
};

const persistedCustomers: ICustomer[] = Array.from(
    { length: totalCustomers },
    (_, i) => {
        const id = ++i,
            parentId: number | undefined = getParentCustomerId(id);

        const persistedCustomers: ICustomer = {
            id: id,
            code: `CUST-${i}`,
            name: `Customer ${i}`,
            isParent: isParentCustomer(id),
            parentId: parentId,
            isOrphan: parentId === undefined
        };
        return persistedCustomers;
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

export const getCustomerHierarchies = (): Promise<ICustomerHierarchy[]> => {
    const customers: ICustomer[] = persistedCustomers;
    const parents: ICustomer[] = persistedCustomers
        .filter(customer => customer.isParent)
        .sort((a, b) => a.name.localeCompare(b.name));

    let customerHierarchies: ICustomerHierarchy[] = [];

    parents.forEach(parent => {
        customerHierarchies.push({
            path: [parent.name],
            ...parent
        });
        const children: ICustomer[] = customers
            .filter(customer => customer.parentId === parent.id)
            .sort((a, b) => a.name.localeCompare(b.name));

        children.forEach(child => {
            customerHierarchies.push({
                path: [parent.name, child.name],
                ...child
            });
        });
        return customerHierarchies;
    });

    return new Promise<ICustomerHierarchy[]>(resolve => {
        setTimeout(() => {
            resolve(customerHierarchies);
        }, 0);
    });
};
