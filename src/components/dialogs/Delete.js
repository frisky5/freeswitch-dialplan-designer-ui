import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export default function Delete(props) {
  return (
    <Dialog open={props.open}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete {props.deleteType} with the ID{" "}
          {props.id} ?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          onClick={() => {
            props.yes();
          }}
        >
          Yes
        </Button>
        <Button
          variant="text"
          color="secondary"
          onClick={() => {
            props.no();
          }}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
