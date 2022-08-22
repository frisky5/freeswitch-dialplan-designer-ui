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
import ConditionConfiguration from "./ConditionConfiguration";

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
            nodeId={props.nodeId}
            nodeData={props.nodeData}
            save={(data) => {
              props.saveExtensionNodeChanges(data);
              setTriggerSave(false);
            }}
          />
        )}
        {props.type === "condition" && (
          <ConditionConfiguration
            triggerSave={triggerSave}
            nodeId={props.nodeId}
            nodeData={props.nodeData}
            save={(data) => {
              props.saveConditionNodeChanges(data);
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
          save
        </Button>
        <Button
          variant="text"
          style={{ color: "orange" }}
          onClick={() => {
            props.close();
          }}
        >
          cancel
        </Button>
        <Button
          variant="text"
          style={{ color: "red" }}
          onClick={() => {
            props.askDeleteNode(props.nodeId);
          }}
        >
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
