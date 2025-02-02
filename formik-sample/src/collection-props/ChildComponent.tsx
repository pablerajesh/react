// ChildComponent.tsx
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { FormValues } from "./types.def";

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

const ChildComponent = ({ initialValues }: ChildComponentProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log(values);
      }}
      enableReinitialize // Add this line to enable reinitializing the form
    >
      {({ values }) => {
        return (
          <Form>
            <FieldArray name="friends">
              {({ push, remove }) => (
                <div>
                  {values.friends.map((_friend, index) => (
                    <div key={_friend.id}>
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
                    onClick={() =>
                      push({
                        id: values.friends.length + 1,
                        name: "",
                        age: 0
                      })
                    }
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
