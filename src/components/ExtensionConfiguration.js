import { useEffect, useState } from "react";
import TextField from "./TextField";
export default function ExtensionConfiguration(props) {
  const [name, setName] = useState(props.nodeData.name);

  useEffect(() => {
    if (props.triggerSave) props.save({ name: name });
  }, [props.triggerSave]);

  return (
    <TextField
      id={"extension" + props.targetId}
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
