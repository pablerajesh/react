import { Button } from "@mui/material";

const fakeAsyncFunction = async () => {
  console.log("Async operation: Begin");
  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log("Async operation: End");
};

const AsyncDemo = () => {
  return (
    <div>
      <h1>Async Demo</h1>
      <Button
        variant="contained"
        onClick={async () => {
          await fakeAsyncFunction();
        }}
      >
        Run Async Function
      </Button>
    </div>
  );
};

export default AsyncDemo;
