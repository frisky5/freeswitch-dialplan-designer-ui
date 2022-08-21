import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import ExtensionConfiguration from "./ExtensionConfiguration";
export default function ConfigurationDialog(props) {
  return (
    <Dialog open={props.open} maxWidth="xl">
      <DialogTitle>Configuration</DialogTitle>
      <DialogContent>
        {props.type === "extension" && (
          <ExtensionConfiguration
            targetId={props.targetId}
            nodeData={props.nodeData}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          onClick={() => {
            props.save();
          }}
        >
          Save
        </Button>
        <Button
          variant="text"
          color="secondary"
          onClick={() => {
            props.close();
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
