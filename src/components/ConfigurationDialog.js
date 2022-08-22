import { useState } from "react";
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
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [triggerSave, setTriggerSave] = useState(false);

  return (
    <Dialog
      open={props.open}
      fullWidth
      maxWidth={props.type === "extension" ? "sm" : "xl"}
    >
      <DialogTitle>Configuration</DialogTitle>
      <DialogContent>
        {props.type === "extension" && (
          <ExtensionConfiguration
            triggerSave={triggerSave}
            targetId={props.targetId}
            nodeData={props.nodeData}
            save={(data) => {
              props.saveExtensionChanges(data);
              setTriggerSave(false);
            }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          disabled={disable}
          style={{ color: "green" }}
          onClick={() => {
            setTriggerSave(true);
          }}
        >
          Save
        </Button>
        <Button
          variant="text"
          style={{ color: "red" }}
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
