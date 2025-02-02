import { Box, Stack } from "@mui/material";
import { Field, FieldArray, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useEffect, useState } from "react";
import { ICustomer } from "./types.def";

interface ICustomersFormProp {
  customers: ICustomer[] | undefined;
}

interface ICustomerFormValue {
  customers: ICustomer[];
}

const CustomersForm = ({ customers }: ICustomersFormProp) => {
  const [initialValues, setInitialValues] = useState<ICustomerFormValue>({
    customers: []
  });

  useEffect(() => {
    console.log("[rp] Customers count: ", customers?.length);
    setInitialValues({ customers: customers || [] });
  }, [customers]);

  return (
    <div>
      <h2>Customers Form</h2>
      <Formik
        inableReinitialize={true}
        initialValues={initialValues}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="customers">
              {() => (
                <Stack direction="column" spacing={3}>
                  {values.customers.length > 0 &&
                    values.customers.map(
                      (_customer: ICustomer, index: number) => {
                        return (
                          <Box key={_customer.id} gap={5}>
                            <Field
                              name={`customers.${index}.name`}
                              label="Name"
                              component={TextField}
                              variant="filled"
                              inputProps={{
                                type: "text",
                                placeholder: "Surname, Name"
                              }}
                            />
                          </Box>
                        );
                      }
                    )}
                </Stack>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CustomersForm;
