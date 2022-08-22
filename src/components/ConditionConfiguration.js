import { Fragment, useEffect, useState } from "react";
import TextField from "./TextField";
import Dropdown from "./Dropdown";
import { Grid } from "@mui/material";
import { conditionLogicTypes } from "../constants";
import { v4 as uuidv4 } from "uuid";

export default function ConditionConfiguration(props) {
  const [name, setName] = useState(props.nodeData.name);
  const [logic, setLogic] = useState(props.nodeData.logic);

  useEffect(() => {
    if (props.triggerSave) props.save({ name: name });
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Dropdown
            label={"Logic Type"}
            value={logic}
            onChange={(logicType) => {
              setLogic(logicType);
            }}
            lebelId={"label" + uuidv4()}
            selectId={"select" + uuidv4()}
            options={conditionLogicTypes}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}
