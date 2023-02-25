import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AlertColor } from "@mui/material/Alert/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type PropsType = {
  Props: {
    Message: string;
    Visible: boolean;
    severity: "error" | "warning" | "info" | "success";
  };
  Func: () => void;
};

export default function CustomizedSnackbars({ Props,Func }: PropsType) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(Props.Visible);
  }, [Props.Visible]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    setOpen(false);
    Func();
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={Props.severity}
          sx={{ width: "100%" }}
        >
          {Props.Message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
