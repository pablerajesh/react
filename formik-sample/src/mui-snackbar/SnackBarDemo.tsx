import { Button, Typography } from "@mui/material";
import useSnackbar from "./useSnackbar";

const SnackBarDemo = () => {
  const { showSnackbar, SnackbarComponent } = useSnackbar();

  const handleShowSuccessSnack = () => {
    showSnackbar("This is a success message!", "success");
  };

  const handleShowErrorSnack = () => {
    showSnackbar("This is an error message!", "error");
  };

  return (
    <div>
      <Typography variant="h4">Snackbar Demo</Typography>
      <Button
        variant="outlined"
        color="success"
        onClick={handleShowSuccessSnack}
      >
        Show Success Snack
      </Button>
      <Button variant="outlined" color="error" onClick={handleShowErrorSnack}>
        Show Success Snack
      </Button>
      <SnackbarComponent />
    </div>
  );
};

export default SnackBarDemo;
