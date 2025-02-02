import * as Yup from "yup";

export interface ICustomer {
  id: number;
  name: string;
  salary: number;
  active: boolean;
}

export interface IFormValues {
  customers: ICustomer[];
}

export const customersValidationSchema = Yup.object({
  customers: Yup.array().of(
    Yup.object({
      id: Yup.number().required("Required"),
      name: Yup.string()
        .required("Required")
        .max(20, "Must be 20 characters or less"),
      salary: Yup.number()
        .required("Required")
        .min(1000, "Must be at least 1")
        .max(10000, "Must be at most 10000"),
      active: Yup.boolean().required("Required")
    })
  )
});

export const initialCustomers: ICustomer[] = [
  {
    id: 1,
    name: "Hanselman, Scott",
    salary: 5000.0,
    active: true
  },
  {
    id: 2,
    name: "Nadela, Satya",
    salary: 2000.0,
    active: false
  }
];

export const initialAlternateCustomers: ICustomer[] = [
  {
    id: 3,
    name: "Skeet, Jon",
    salary: 3000.0,
    active: true
  },
  {
    id: 4,
    name: "Fowler, Martin",
    salary: 4000.0,
    active: false
  },
  {
    id: 5,
    name: "Henney, Kevlin",
    salary: 8000.0,
    active: false
  }
];
