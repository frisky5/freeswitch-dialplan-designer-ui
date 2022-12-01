import { FilledInput, FormControl, InputLabel } from "@mui/material";

export default function TextField(props) {
  return (
    <FormControl
      variant="filled"
      fullWidth
      error={props.error}
      required
      disabled={props.disabled}
    >
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <FilledInput
        fullWidth
        value={props.value}
        onChange={(e) => {
          switch (props.type) {
            case "number":
              if (!isNaN(e.target.value.trim()))
                props.onChange(Number(e.target.value.trim()));
              break;
            case "text":
              props.onChange(e.target.value);
              break;
            default:
              props.onChange(e.target.value);
              break;
          }
        }}
      />
    </FormControl>
  );
}
