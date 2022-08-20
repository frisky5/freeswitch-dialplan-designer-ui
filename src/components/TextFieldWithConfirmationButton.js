import {
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  FilledInput,
  Input,
} from "@mui/material";

export default function TextFieldWithConfirmationButton(props) {
  return (
    <FormControl variant="filled" fullWidth error={props.error}>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <FilledInput
        id={props.id}
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
          }
        }}
        endAdornment={
          <InputAdornment position="end">
            <Button
              size={"small"}
              variant="text"
              onClick={props.onClick}
              variant="outlined"
            >
              Save
            </Button>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
