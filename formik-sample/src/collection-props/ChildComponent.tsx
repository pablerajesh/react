// ChildComponent.tsx
import { Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { Friend } from "./types.def";

interface FormValues {
  friends: Friend[];
}

interface ChildComponentProps {
  initialValues: FormValues;
}

const validationSchema = Yup.object({
  friends: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Required"),
      age: Yup.number().required("Required").min(1, "Must be at least 1")
    })
  )
});

const ChildComponent: React.FC<ChildComponentProps> = ({ initialValues }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log(values);
      }}
      enableReinitialize // Add this line to enable reinitializing the form
    >
      {({ values, setValues }) => {
        useEffect(() => {
          setValues(initialValues); // Manually update Formik values
        }, [initialValues, setValues]);

        return (
          <Form>
            <FieldArray name="friends">
              {({ push, remove }) => (
                <div>
                  {values.friends.map((_friend, index) => (
                    <div key={index}>
                      <Field
                        name={`friends.${index}.name`}
                        placeholder="Name"
                      />
                      <Field
                        name={`friends.${index}.age`}
                        placeholder="Age"
                        type="number"
                      />
                      <button type="button" onClick={() => remove(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ name: "", age: 0 })}
                  >
                    Add Friend
                  </button>
                </div>
              )}
            </FieldArray>
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ChildComponent;
