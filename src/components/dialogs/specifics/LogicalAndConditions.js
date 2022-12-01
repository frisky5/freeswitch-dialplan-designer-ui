import { Fragment, useEffect, useState } from "react";
import TextField from "../../TextField";
import Dropdown from "../../Dropdown";
import {
  Divider,
  Grid,
  Chip,
  Box,
  TextField as MuiTextField,
  Autocomplete,
  FilledInput,
  Stack
} from "@mui/material";


import { useSnackbar } from "notistack"

export default function LogicalAndConditions(props) {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [field, setField] = useState(props.data.nodeData.field);
  const [expression, setExpression] = useState(props.data.nodeData.expression);

  useEffect(() => {
    if (props.triggerSave) {
      if (field == null || field.length === 0) {
        enqueueSnackbar("Condition field cannot be empty", { variant: "error" })
        props.cancelSave();
        return
      } else if (expression == null || expression.length === 0) {
        enqueueSnackbar("Condition expression cannot be empty", { variant: "error" })
        props.cancelSave();
        return
      }
      props.save({
        nodeIndex: props.data.nodeIndex,
        nodeType: props.data.nodeType,
        field: field,
        expression: expression,
      })
    }
  }, [props.triggerSave]);

  return (
    <Fragment>
      <Stack direction={"row"} spacing={2}>
        <TextField
          label="Field"
          type="text"
          value={field}
          onChange={(value) => {
            setField(value);
          }}
          error={field.length === 0}
        />
        <TextField
          label="Expression"
          type="text"
          value={expression}
          onChange={(value) => {
            setExpression(value);
          }}
          error={expression.length === 0}
        />
      </Stack>
    </Fragment>
  );
}
