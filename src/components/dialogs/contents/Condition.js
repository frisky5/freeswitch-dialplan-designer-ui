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
  Button,
  Pagination,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ConditionListItem from "../../misc/ConditionListItem";

import { useSnackbar } from "notistack";
import produce from "immer";

const logicTypes = [
  { name: "Single Condition", value: "single" },
  { name: "Logical AND Conditions", value: "logicalAnd" },
  { name: "Logical OR Conditions", value: "logicalOr" },
];

export default function Condition(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState(props.data.nodeData.name);
  const [logic, setLogic] = useState(props.data.nodeData.logic);
  const [isSingleCondition, setIsSingleCondition] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [logicsPositions, setLogicsPosition] = useState([0, 5]);

  const addCondition = useCallback(() => {
    setLogic(
      produce(logic, (draft) => {
        draft.conditions.push({ field: "", expression: "" });
      })
    );
  }, [logic]);

  const deleteCondition = useCallback(() => {
    setLogic(
      produce(logic, (draft) => {
        draft.conditions.splice(props.key, 1);
      })
    );
  }, [logic]);

  const resetConditionsToSingle = useCallback(
    (index) => {
      setLogic(
        produce(logic, (draft) => {
          draft.conditions.splice(1, logic.conditions.length);
        })
      );
    },
    [logic]
  );

  function modifyField(index, data) {
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

  const modifyLogicType = useCallback(
    (data) => {
      setLogic(
        produce(logic, (draft) => {
          draft.type = data;
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
        });
      }
    }
  }, [props.triggerSave]);

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
              value={logic.type}
              label="Logic Type"
              onChange={(e) => {
                modifyLogicType(e.target.value);
                if (e.target.value === "single") {
                  resetConditionsToSingle();
                }
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
            <Button
              onClick={addCondition}
              variant={"contained"}
              endIcon={<AddCircleIcon />}
              tabIndex={-1}
              disabled={logic.type === "single"}
            >
              Add Logic
            </Button>
          </Divider>
        </Grid>
        <Grid item xs={12} style={{ minHeight: "480px" }}>
          <List style={{ minWidth: "100%" }}>
            {logic.conditions.map((condition, index) => {
              if (index >= logicsPositions[0] && index < logicsPositions[1])
                return (
                  <ConditionListItem
                    key={index}
                    index={index}
                    condition={condition}
                    conditionsCount={logic.conditions.length}
                    modifyField={modifyField}
                    modifyExpression={modifyExpression}
                    deleteCondition={deleteCondition}
                    logicType={logic.type}
                  />
                );
              else return null;
            })}
          </List>
        </Grid>
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
          <Pagination
            color="primary"
            count={Math.ceil(logic.conditions.length / pageSize)}
            onChange={(e, v) => {
              const var1 = (v - 1) * pageSize;
              const var2 = v * pageSize;
              setLogicsPosition([var1, var2]);
              setPage(v);
            }}
            showFirstButton
            showLastButton
          />
        </Grid>
      </Grid>
    </Box>
  );
}
