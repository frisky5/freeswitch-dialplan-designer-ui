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
import SingleCondtion from "./contents/SingleCondition";

export default function Configuration(props) {
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [triggerSave, setTriggerSave] = useState(false);

  function selectConfigType() {
    switch (props.data.nodeType) {
      case "extension":
        return <Extension
          triggerSave={triggerSave}
          data={props.data}
          save={(data) => {
            props.save(data);
            setTriggerSave(false);
          }}
          cancelSave={() => { setTriggerSave(false) }}
        />
      case "singleCondition":
        return <SingleCondtion
          triggerSave={triggerSave}
          data={props.data}
          save={(data) => {
            props.save(data);
            setTriggerSave(false);
          }}
          cancelSave={() => { setTriggerSave(false) }}
        />

      default: return null
    }
  }

  return (
    <Dialog
      open={props.open}
      fullWidth
      maxWidth={props.type === "extension" ? "sm" : "xl"}
    >
      <DialogTitle>Configuration</DialogTitle>
      <DialogContent>
        {selectConfigType()}
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          disabled={disable}
          color="primary"
          onClick={() => {
            setTriggerSave(true);
          }}
        >
          save
        </Button>
        <Button
          variant="text"
          disabled={disable}
          color="secondary"
          onClick={() => {
            props.close();
          }}
        >
          cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
