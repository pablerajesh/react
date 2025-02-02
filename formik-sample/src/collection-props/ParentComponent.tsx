import { useState } from "react";
import ChildComponent from "./ChildComponent";

const ParentComponent = () => {
  const [initialValues, setInitialValues] = useState({
    friends: [
      { name: "Alice", age: 25 },
      { name: "Bob", age: 24 }
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
              { name: "Charlie", age: 30 },
              { name: "Dana", age: 28 }
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
