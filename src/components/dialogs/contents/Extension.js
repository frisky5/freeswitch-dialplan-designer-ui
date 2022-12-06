import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import TextField from "../../TextField";

export default function Extension(props) {
  const [name, setName] = useState(props.data.nodeData.name);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  useEffect(() => {
    if (props.triggerSave) {
      if (name == null || name.length === 0) {
        enqueueSnackbar("Extension name cannot be empty", { variant: "error" })
        props.cancelSave();
        return;
      }
      props.save({
        nodeId: props.data.nodeId,
        nodeIndex: props.data.nodeIndex,
        nodeType: props.data.nodeType,
        name: name
      });
    }
  }, [props.triggerSave]);

  return (
    <TextField
      label="Extension Name"
      type="text"
      value={name}
      onChange={(value) => {
        setName(value);
      }}
      error={name.length === 0}
    />
  );
}
