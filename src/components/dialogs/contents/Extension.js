import { FormControl, InputLabel, OutlinedInput, Box } from "@mui/material";

import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

export default function Extension(props) {
  const [name, setName] = useState(props.data.nodeData.name);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (props.triggerSave) {
      if (name == null || name.length === 0) {
        enqueueSnackbar("Extension name cannot be empty", { variant: "error" });
        props.cancelSave();
        return;
      }
      props.save({
        nodeId: props.data.nodeId,
        nodeIndex: props.data.nodeIndex,
        nodeType: props.data.nodeType,
        name: name,
      });
    }
  }, [props.triggerSave]);

  return (
    <Box p="1rem">
      <FormControl fullWidth variant="outlined" required>
        <InputLabel htmlFor={"extension-name"}>Name</InputLabel>
        <OutlinedInput
          fullWidth
          label="Name"
          id={"extension-name"}
          error={name === ""}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </FormControl>
    </Box>
  );
}
