const inputHandleId = uuidv4();
export default function GenericNode(props) {
  return (
    <React.Fragment>
      <Box
        ml={2}
        mr={2}
        mt={1}
        mb={1}
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "space-between",
        }}
      >
        <Typography style={{ float: "left" }}>{props.title}</Typography>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <IconButton
            size="small"
            style={{ marginRight: "10px" }}
            onClick={() => {
              data.askDeleteNode(id);
            }}
          >
            <DeleteOutlineIcon fontSize="medium" />
          </IconButton>

          <PanToolIcon
            style={{
              fontSize: "18px",
              color: "rgba(0, 0, 0, 0.54)",
            }}
            className="custom-drag-handle"
          />
        </Box>
      </Box>
      <Box>
        <Box pl={2} pr={2} mb={2}>
          {props.children}
        </Box>
        <Tooltip title="Input" arrow>
          <Handle
            id={uuidv4()}
            type="target"
            position="left"
            style={{
              background: "green",
              border: "none",
              transform: "translate(-1.4px,0px)",
            }}
          />
        </Tooltip>
      </Box>
    </React.Fragment>
  );
}
