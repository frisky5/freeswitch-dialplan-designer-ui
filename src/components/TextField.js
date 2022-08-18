import { FilledInput, FormControl, InputLabel, Input } from "@mui/material";

export default function TextField(props) {
  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel>{props.label}</InputLabel>
      <FilledInput
        size="small"
        fullWidth
        value={props.value}
        onChange={(e) => {
          switch (props.type) {
            case "number":
              if (!isNaN(e.target.value.trim()))
                props.onChange(e.target.value.trim());
              break;
            case "text":
              props.onChange(e.target.value);
              break;
          }
        }}
      />
    </FormControl>
  );
}
