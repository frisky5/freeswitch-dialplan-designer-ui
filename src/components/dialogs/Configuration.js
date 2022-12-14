import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import Extension from "./contents/Extension";
import Condition from "./contents/Condition";
import Action from "./contents/Actions";

export default function Configuration(props) {
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [triggerSave, setTriggerSave] = useState(false);

  function selectConfigType() {
    switch (props.data.nodeType) {
      case "Extension":
        return (
          <Extension
            triggerSave={triggerSave}
            data={props.data}
            save={(data) => {
              props.save(data);
              setTriggerSave(false);
            }}
            cancelSave={() => {
              setTriggerSave(false);
            }}
          />
        );
      case "Condition":
        return (
          <Condition
            triggerSave={triggerSave}
            data={props.data}
            save={(data) => {
              props.save(data);
              setTriggerSave(false);
            }}
            cancelSave={() => {
              setTriggerSave(false);
            }}
          />
        );
      case "Action":
        return (
          <Action
            triggerSave={triggerSave}
            data={props.data}
            save={(data) => {
              props.save(data);
              setTriggerSave(false);
            }}
            cancelSave={() => {
              setTriggerSave(false);
            }}
          />
        );
      default:
        return null;
    }
  }

  return (
    <Dialog open={props.open} maxWidth={"xl"} fullWidth>
      <DialogTitle>
        <Typography align="center">
          {"Configuration of " + props.data.nodeType}
        </Typography>
      </DialogTitle>
      <DialogContent>{selectConfigType()}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={disable}
          color="primary"
          onClick={() => {
            setTriggerSave(true);
          }}
        >
          Save
        </Button>
        <Button
          variant="contained"
          disabled={disable}
          color="error"
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
