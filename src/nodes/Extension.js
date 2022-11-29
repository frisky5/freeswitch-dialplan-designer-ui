import { Box, Button, Tooltip, Typography } from "@mui/material";
import React, { memo } from "react";

import { Handle } from "reactflow";


export default memo(({ id, type, data }) => {
  return (
    <React.Fragment>
      <Box
        className="custom-drag-handle"
        style={{
          height: "27px",
          borderBottom: "2px solid",
          borderColor: "inherit"
        }}
      >
        <Typography
          align="center"
        >
          Extension
        </Typography>
      </Box>
      <Box padding={2}>
        <Button
          variant={"contained"}
          style={{ background: "#3498db" }}
          size="small"
          onClick={() => {
            data.openConfig(id, type);
          }}
        >
          Edit
        </Button>
      </Box>
      <Handle
        id={data.inputHandleId}
        type="target"
        position="left"
      />
      <div className="right_handles_wrapper">
        <Tooltip
          title="Extension content"
          arrow
          disableInteractive
        >
          <Handle
            id={data.extensionContentHandleId}
            position="right"
          />
        </Tooltip>
        <Tooltip
          title="Next Extension"
          arrow
          disableInteractive
        >
          <Handle
            id={data.nextExtensionHandleId}
            position="right"

          />
        </Tooltip>
      </div>
    </React.Fragment>
  );
});
