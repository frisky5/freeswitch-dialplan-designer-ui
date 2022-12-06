import { useCallback, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Typography,
  List,
  IconButton,
  OutlinedInput,
  Grid,
  Tooltip,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ConditionListItem from "../../misc/ConditionListItem";

import { useSnackbar } from "notistack";
import produce from "immer";

const logicTypes = [
  { name: "Single Condition", value: "singleCondition" },
  { name: "Logical AND Conditions", value: "logicalAndConditions" },
  { name: "Logical OR Conditions", value: "logicalOrConditions" },
];

export default function Condition(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState(props.data.nodeData.name);
  const [logicType, setLogicType] = useState(props.data.nodeData.logicType);
  const [logic, setLogic] = useState(props.data.nodeData.logic);
  const [isSinsgleCondition, setIsSingleCondition] = useState(false);

  async function modifyField(index, data) {
    setLogic(
      produce(logic, (draft) => {
        draft.conditions[index].field = data;
      })
    );
  }

  const modifyExpression = useCallback(
    (index, data) => {
      setLogic(
        produce(logic, (draft) => {
          draft.conditions[index].expression = data;
        })
      );
    },
    [logic]
  );

  const addCondition = useCallback(() => {
    setLogic(
      produce(logic, (draft) => {
        draft.conditions.push({ field: "", expression: "" });
      })
    );
  }, [logic]);

  const deleteCondition = useCallback(
    (index) => {
      setLogic(
        produce(logic, (draft) => {
          draft.conditions.splice(props.key, 1);
        })
      );
    },
    [logic]
  );

  useEffect(() => {
    if (props.triggerSave) {
      let error = false;
      logic.conditions.forEach((condition, index) => {
        if (condition.field === "" || condition.expression === "") error = true;
      });
      if (error) {
        enqueueSnackbar("Field or Expression is empty", {
          variant: "error",
        });
        props.cancelSave();
      } else {
        props.save({
          nodeId: props.data.nodeId,
          nodeIndex: props.data.nodeIndex,
          nodeType: props.data.nodeType,
          name: name,
          logic: logic,
          logicType: logicType,
        });
      }
    }
  }, [props.triggerSave]);

  useEffect(() => {
    if (logicType === "singleCondition") setIsSingleCondition(true);
  }, []);

  return (
    <Box pt={2} style={{ minWidth: "100%" }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth={true}>
            <InputLabel htmlFor="condition-name">Name</InputLabel>
            <OutlinedInput
              label="Name"
              id={"condition-name"}
              error={name === ""}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth>
            <InputLabel id="logic-type-select">Logic Type</InputLabel>
            <Select
              labelId="logic-type-select"
              id="logic-type-select"
              value={logicType}
              label="Logic Type"
              onChange={(newVal) => {
                setLogicType(newVal.target.value);
                if (newVal.target.value === "singleCondition")
                  setIsSingleCondition(true);
                else setIsSingleCondition(false);
              }}
              required
            >
              {logicTypes.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Divider>
            <Typography variant="overline">Logic Conditions</Typography>
          </Divider>
        </Grid>
        <Grid item xs={12}>
          <List style={{ minWidth: "100%" }}>
            {logic.conditions.map((condition, index) => (
              <ConditionListItem
                key={index}
                index={index}
                condition={condition}
                isSinsgleCondition={isSinsgleCondition}
                conditionsCount={logic.conditions.length}
                modifyField={modifyField}
                modifyExpression={modifyExpression}
                deleteCondition={deleteCondition}
              />
            ))}
          </List>
        </Grid>
        {!isSinsgleCondition && (
          <Grid
            item
            xs={12}
            style={{
              position: "sticky",
              bottom: -20,
              zIndex: 999,
              backgroundColor: "white",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Tooltip title="Click to add condition" arrow>
              <IconButton
                style={{
                  color: "#2ecc71",
                }}
                onClick={addCondition}
              >
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
