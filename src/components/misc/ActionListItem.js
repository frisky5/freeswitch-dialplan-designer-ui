import {
  FormControl,
  InputLabel,
  ListItem,
  OutlinedInput,
  Button,
  Grid,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function ActionListItem(props) {
  return (
    <ListItem>
      <Grid
        container
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
      >
        {!props.isSinsgleCondition && (
          <Grid item xs={1}>
            <Button
              color="secondary"
              disabled={props.index === 0 && props.conditionsCount === 1}
              startIcon={<RemoveCircleIcon />}
              onClick={() => {
                props.deleteAction(props.index);
              }}
            >
              {props.index}
            </Button>
          </Grid>
        )}
        <Grid item xs={12} sm={props.isSinsgleCondition ? 6 : 5}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor={"condition-field-" + props.index}>
              Field
            </InputLabel>
            <OutlinedInput
              label="Application"
              id={"condition-field-" + props.index}
              error={props.application === ""}
              value={props.application}
              onChange={(event) => {
                props.modifyApplication(props.index, event.target.value);
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={props.isSinsgleCondition ? 6 : 5}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor={"condition-expression-" + props.index}>
              Data
            </InputLabel>
            <OutlinedInput
              label="Expression"
              id={"condition-expression-" + props.index}
              value={props.data}
              error={props.data === ""}
              onChange={(event) => {
                props.modifyData(props.index, event.target.value);
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
    </ListItem>
  );
}
