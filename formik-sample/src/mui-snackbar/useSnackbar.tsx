import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

// Define the type for the Snackbar's severity
type SnackbarSeverity = "success" | "error" | "warning" | "info";

// Define the return type for the custom hook
interface UseSnackbarReturn {
  showSnackbar: (msg: string, severity?: SnackbarSeverity) => void;
  SnackbarComponent: () => JSX.Element;
}

const useSnackbar = (): UseSnackbarReturn => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<SnackbarSeverity>("success");

  const showSnackbar = (
    msg: string,
    severity: SnackbarSeverity = "success"
  ) => {
    setMessage(msg);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const SnackbarComponent = (): JSX.Element => (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );

  return { showSnackbar, SnackbarComponent };
};

export default useSnackbar;
