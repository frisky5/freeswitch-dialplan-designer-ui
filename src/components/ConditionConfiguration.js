import { Fragment, useEffect, useState } from "react";
import TextField from "./TextField";
import Dropdown from "./Dropdown";
import {
  Divider,
  Grid,
  Chip,
  Box,
  TextField as MuiTextField,
  Autocomplete,
  FilledInput,
} from "@mui/material";

import {
  conditionLogicTypes,
  conditionTypes,
  callerProfileVariables,
} from "../constants";
import { v4 as uuidv4 } from "uuid";
import produce from "immer";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function ConditionConfiguration(props) {
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(props.nodeData.name);
  const [logic, setLogic] = useState(props.nodeData.logic);
  const [conditions, setConditions] = useState(props.nodeData.conditions);

  useEffect(() => {
    console.log("condition configuration trigger save : ", props.triggerSave);
    if (props.triggerSave) props.save({ name: name, logic, logic });
  }, [props.triggerSave]);

  return (
    <Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <TextField
            id={"condition" + props.targetId}
            label="Name"
            type="text"
            value={name}
            onChange={(value) => {
              setName(value);
            }}
            disabled={saving}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Dropdown
            label={"Logic Type"}
            value={logic}
            onChange={(logicType) => {
              switch (logicType) {
                case 1:
                  setConditions([{ type: 1 }]);
                  break;
                case 2:
                  break;
                case 3:
                  break;
                default:
                  return;
              }
              setLogic(logicType);
            }}
            lebelId={"label" + uuidv4()}
            selectId={"select" + uuidv4()}
            options={conditionLogicTypes}
            disabled={saving}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider style={{ margin: "10px" }}>
            <Chip label="Logic Settings"></Chip>
          </Divider>
        </Grid>
        <Grid item xs={12}>
          {logic === 1 ? (
            <Fragment>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Dropdown
                    label={"Condition Type"}
                    value={conditions[0].type != null ? conditions[0].type : 1}
                    onChange={(type) => {
                      setConditions([{ type: type }]);
                    }}
                    lebelId={"label" + uuidv4()}
                    selectId={"select" + uuidv4()}
                    options={conditionTypes}
                    disabled={saving}
                  />
                </Grid>
                {conditions[0] != null &&
                conditions[0].type != null &&
                conditions[0].type === 1 ? (
                  <Fragment>
                    <Grid item xs={6}>
                      <Box display={"flex"}>
                        <Autocomplete
                          value={
                            conditions[0] != null &&
                            conditions[0].variable != null
                              ? conditions[0].variable
                              : null
                          }
                          onChange={(event, newValue) => {
                            //newValue is object {id:1,label:"label value"}
                            setConditions(
                              produce(conditions, (draft) => {
                                draft[0].variable = newValue;
                              })
                            );
                          }}
                          inputValue={
                            conditions[0] != null && conditions[0].input != null
                              ? conditions[0].input
                              : ""
                          }
                          onInputChange={(event, newInputValue) => {
                            setConditions(
                              produce(conditions, (draft) => {
                                draft[0].input = newInputValue;
                              })
                            );
                          }}
                          id={"ac" + uuidv4()}
                          options={callerProfileVariables}
                          fullWidth
                          renderInput={(params) => (
                            <MuiTextField {...params} label="Variable" />
                          )}
                        />
                        <ArrowRightAltIcon
                          style={{ marginTop: "11px", marginLeft: "20px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id={"condition" + props.targetId}
                        label="Expression"
                        type="text"
                        value={
                          conditions[0].expression != null
                            ? conditions[0].expression
                            : ""
                        }
                        onChange={(value) => {
                          setConditions(
                            produce(conditions, (draft) => {
                              draft[0].expression = value;
                            })
                          );
                        }}
                        disabled={saving}
                      />
                    </Grid>
                  </Fragment>
                ) : (
                  <Fragment></Fragment>
                )}
              </Grid>
            </Fragment>
          ) : logic === 2 ? (
            <Fragment></Fragment>
          ) : logic === 3 ? (
            <Fragment></Fragment>
          ) : (
            <Fragment></Fragment>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
}
