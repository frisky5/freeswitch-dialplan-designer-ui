import {
  FormControl,
  InputLabel,
  ListItem,
  OutlinedInput,
  Button,
  Grid,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function ConditionListItem(props) {
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
                props.deleteCondition(props.index);
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
              label="Field"
              id={"condition-field-" + props.index}
              error={props.condition.field === ""}
              value={props.condition.field}
              onChange={(event) => {
                props.modifyField(props.index, event.target.value);
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={props.isSinsgleCondition ? 6 : 5}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor={"condition-expression-" + props.index}>
              Expression
            </InputLabel>
            <OutlinedInput
              label="Expression"
              id={"condition-expression-" + props.index}
              value={props.condition.expression}
              error={props.condition.expression === ""}
              onChange={(event) => {
                props.modifyExpression(props.index, event.target.value);
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
    </ListItem>
  );
}
