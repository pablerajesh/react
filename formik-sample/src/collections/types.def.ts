export interface ICustomer {
  id: number;
  name: string;
  salary: number;
  active: boolean;
}

export const initialCustomers: ICustomer[] = [
  {
    id: 1,
    name: "John, Doe",
    salary: 1000.0,
    active: true
  },
  {
    id: 1,
    name: "Jane, Doe",
    salary: 2000.0,
    active: false
  }
];
