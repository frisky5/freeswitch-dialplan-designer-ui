import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function Dropdown(props) {
  return (
    <FormControl
      variant="filled"
      fullWidth
      error={props.error}
      disabled={props.disabled}
    >
      <InputLabel id={props.labelId}>{props.label}</InputLabel>
      <Select
        id={props.selectId}
        labelId={props.labelId}
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      >
        {props.options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
