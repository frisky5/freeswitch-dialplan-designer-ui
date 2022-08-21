import { Fragment } from "react";
import TextField from "./TextField";
import { v4 as uuidv4 } from "uuid";
export default function SingleCondition(props) {
  return (
    <Fragment>
      <TextField
        id={"field" + uuidv4()}
        label="Field"
        type="text"
        value={props.field}
        onChange={(value) => {
          props.setField(value);
        }}
      />
      <TextField
        id={"expression" + uuidv4()}
        label="Expression"
        type="text"
        value={props.expression}
        onChange={(value) => {
          props.setExpression(value);
        }}
      />
    </Fragment>
  );
}
