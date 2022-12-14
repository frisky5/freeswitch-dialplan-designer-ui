import {
  FormControl,
  InputLabel,
  ListItem,
  OutlinedInput,
  Button,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function ConditionListItem(props) {
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
            disabled={
              (props.index === 0 && props.conditionsCount === 1) ||
              props.logicType === "single"
            }
            startIcon={<RemoveCircleIcon />}
            onClick={() => {
              props.deleteCondition(props.index);
            }}
          >
            {props.index}
          </Button>
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
        </Box>
        <Divider />
      </Box>
    </ListItem>
  );
}
