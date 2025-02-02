import { Box, Stack } from "@mui/material";
import { Field, FieldArray, Form, Formik, FormikState } from "formik";
import { TextField } from "formik-mui";
import { ICustomer, IFormValues, customersValidationSchema } from "./types.def";

interface CustomerFormProps {
  initialValues: IFormValues;
}

const CustomerForm = ({ initialValues }: CustomerFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={customersValidationSchema}
      enableReinitialize
      onSubmit={values => console.log(values)}
    >
      {({ values }: FormikState<IFormValues>) => (
        <Form>
          <FieldArray name="customers">
            {() => (
              <Box gap={2} component={Stack}>
                {values.customers.length > 0 &&
                  values.customers.map((customer: ICustomer, index: number) => {
                    return (
                      <Stack key={customer.id} direction={"row"} spacing={2}>
                        <Field
                          label="Name"
                          placeholder="Surname, Name"
                          type="text"
                          name={`customers.[${index}].name`}
                          variant="filled"
                          component={TextField}
                          InputProps={{}}
                        />
                        <Field
                          label="Salary"
                          type="number"
                          name={`customers.[${index}].salary`}
                          variant="filled"
                          component={TextField}
                          InputProps={{}}
                        />
                      </Stack>
                    );
                  })}
              </Box>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
};

export default CustomerForm;
