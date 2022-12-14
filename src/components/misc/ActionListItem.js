import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  ListItem,
  OutlinedInput,
} from "@mui/material";
import { Box } from "@mui/system";

export default function ActionListItem(props) {
  return (
    <ListItem>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "nopwrap",
            justifyContent: "flex-start",
            alignItems: "center",
            alignContent: "stretch",
            gap: "1rem",
          }}
        >
          <Button
            color="error"
            disabled={props.index === 0 && props.actionsCount === 1}
            startIcon={<RemoveCircleIcon />}
            onClick={() => {
              props.deleteAction(props.index);
            }}
            tabIndex={-1}
          >
            {props.index}
          </Button>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor={"tsuki-aa-" + props.index}>
              Application
            </InputLabel>
            <OutlinedInput
              label="Application"
              id={"tsuki-aa-" + props.index}
              error={props.application === ""}
              value={props.application}
              onChange={(event) => {
                props.modifyApplication(props.index, event.target.value);
              }}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor={"tsuki-ad-" + props.index}>Data</InputLabel>
            <OutlinedInput
              label="Data"
              id={"tsuki-ad-" + props.index}
              value={props.data}
              error={props.data === ""}
              onChange={(event) => {
                props.modifyData(props.index, event.target.value);
              }}
            />
          </FormControl>
        </Box>
        <Divider></Divider>
      </Box>
    </ListItem>
  );
}
