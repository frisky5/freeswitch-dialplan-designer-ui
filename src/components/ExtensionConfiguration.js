import { useState } from "react";
import TextField from "./TextField";
export default function ExtensionConfiguration(props) {
  const [name, setName] = useState(props.name);
  return (
    <TextField
      id={"extension" + props.targetId}
      label="Name"
      type="text"
      value={name}
      onChange={(value) => {
        setName(value);
      }}
    />
  );
}
