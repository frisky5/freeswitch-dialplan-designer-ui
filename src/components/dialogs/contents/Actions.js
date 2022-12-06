import { useCallback, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Divider,
  Typography,
  List,
  IconButton,
  OutlinedInput,
  Grid,
  Tooltip,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useSnackbar } from "notistack";
import produce from "immer";
import ActionListItem from "../../misc/ActionListItem";

export default function Action(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState(props.data.nodeData.name);
  const [actions, setActions] = useState(props.data.nodeData.actions);

  const modifyApplication = useCallback(
    (index, data) => {
      setActions(
        produce(actions, (draft) => {
          draft[index].application = data;
        })
      );
    },
    [actions]
  );

  const modifyData = useCallback(
    (index, data) => {
      setActions(
        produce(actions, (draft) => {
          draft[index].data = data;
        })
      );
    },
    [actions]
  );

  const addAction = useCallback(() => {
    setActions(
      produce(actions, (draft) => {
        draft.push({ field: "", expression: "" });
      })
    );
  }, [actions]);

  const deleteAction = useCallback(() => {
    setActions(
      produce(actions, (draft) => {
        draft.splice(props.key, 1);
      })
    );
  }, [actions]);

  useEffect(() => {
    if (props.triggerSave) {
      let error = false;

      actions.forEach((action) => {
        if (action.application === "") error = true;
      });

      if (error) {
        enqueueSnackbar("Application box is empty", {
          variant: "error",
        });
        props.cancelSave();
      } else {
        props.save({
          nodeId: props.data.nodeId,
          nodeIndex: props.data.nodeIndex,
          nodeType: props.data.nodeType,
          name: name,
          actions: actions,
        });
      }
    }
  }, [props.triggerSave]);

  return (
    <Box pt={2} style={{ minWidth: "100%" }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <FormControl required fullWidth={true}>
            <InputLabel htmlFor="action-name">Name</InputLabel>
            <OutlinedInput
              label="Name"
              id={"action-name"}
              error={name === ""}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Divider>
            <Typography variant="overline">Logic Conditions</Typography>
          </Divider>
        </Grid>
        <Grid item xs={12}>
          <List style={{ minWidth: "100%" }}>
            {actions.map((action, index) => (
              <ActionListItem
                key={index}
                index={index}
                application={action.application}
                data={action.data}
                modifyApplication={modifyApplication}
                modifyData={modifyData}
                deleteAction={deleteAction}
              />
            ))}
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
          <Tooltip title="Click to add action" arrow>
            <IconButton
              style={{
                color: "#2ecc71",
              }}
              onClick={addAction}
            >
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}
