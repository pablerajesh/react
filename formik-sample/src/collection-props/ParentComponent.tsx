import { useState } from "react";
import ChildComponent from "./ChildComponent";
import { FormValues } from "./types.def";

const ParentComponent = () => {
  const [initialValues, setInitialValues] = useState<FormValues>({
    friends: [
      { id: 1, name: "Alice", age: 25 },
      { id: 2, name: "Bob", age: 24 }
    ]
  });

  return (
    <div>
      <h1>Dynamic Form Example</h1>
      <ChildComponent initialValues={initialValues} />
      <button
        onClick={() =>
          setInitialValues({
            friends: [
              { id: 3, name: "Charlie", age: 30 },
              { id: 4, name: "Dana", age: 28 }
            ]
          })
        }
      >
        Change Initial Values
      </button>
    </div>
  );
};

export default ParentComponent;
