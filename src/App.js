import React, { useCallback, useRef, useState } from "react";
import {
  Container,
  createTheme,
  CssBaseline,
  LinearProgress,
  ThemeProvider,
} from "@mui/material";
import produce from "immer";

import ReactFlow, {
  addEdge,
  Controls,
  MarkerType,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

import { v4 as uuidv4 } from "uuid";
import "./index.css";
import Action from "./components/nodes/Action";
import Condition from "./components/nodes/Condition";
import Extension from "./components/nodes/Extension";
import IvrMenu from "./components/nodes/IvrMenu";
import Start from "./components/nodes/Start";
import Configuration from "./components/dialogs/Configuration";
import AppBarAndNodesDrawer from "./components/TopBarAndNodesDrawer";
import ralewayFont from "./assests/fonts/raleway.ttf";
import { SnackbarProvider } from "notistack";

const nodeTypes = {
  Start: Start,
  Extension: Extension,
  Condition: Condition,
  Action: Action,
  ivrMenu: IvrMenu,
};

const theme = createTheme({
  typography: {
    fontFamily: "Raleway, Arial",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Raleway';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Raleway'), local('Raleway-Regular'), url(${ralewayFont}) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});

function App() {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      //first node in any dialplan flow, do not modify this
      id: uuidv4(),
      type: "Start",
      draggable: false,
      selectable: false,
      position: { x: 15, y: 20 },
      data: { handleId: uuidv4() },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [configDialogData, setConfigDialogData] = useState({ open: false });

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (type == null) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      let node = {
        id: uuidv4(),
        type,
        position,
        dragHandle: ".custom-drag-handle",
        selectable: true,
        data: {
          name: "",
          inputHandleId: uuidv4(),
          openConfig: openConfig,
        },
      };

      switch (type) {
        case "Extension":
          node = {
            ...node,
            data: {
              ...node.data,
              extensionContentHandleId: uuidv4(),
              nextExtensionHandleId: uuidv4(),
            },
          };
          break;
        case "Condition":
          node = {
            ...node,
            data: {
              ...node.data,
              logic: { conditions: [{ field: "", expression: "" }] },
              logicType: "singleCondition",
              matchHandleId: uuidv4(),
              noMatchHandleId: uuidv4(),
            },
          };
          break;
        case "Action":
          node = {
            ...node,
            data: {
              ...node.data,
              actions: [{ application: "", data: "" }],
              outputHandleId: uuidv4(),
            },
          };
          break;
        case "ivrMenu":
          node = {
            ...node,
            data: {
              ...node.data,
              noOfOutput: 0,
              timeout: 0,
              interDigitTimeout: 0,
              maxFailure: 0,
              digitLength: 0,
            },
          };

          break;
        default:
          break;
      }
      setNodes((nodes) => nodes.concat(node));
    },
    [reactFlowInstance, setNodes]
  );

  // trigger on nodes connection
  const onConnect = useCallback(
    (params) => {
      setEdges((edges) =>
        addEdge(
          {
            ...params,
            id: uuidv4(),
            data: {},
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: "black",
              height: 20,
              width: 50,
            },
          },
          edges
        )
      );
    },
    [setEdges]
  );

  //configuration
  function openConfig(id, type) {
    const indexOfNode = reactFlowInstance
      .getNodes()
      .findIndex((node) => node.id === id);
    setConfigDialogData({
      open: true,
      nodeId: id,
      nodeType: type,
      nodeIndex: indexOfNode,
      nodeData: reactFlowInstance.getNodes()[indexOfNode].data,
    });
  }

  function closeConfig() {
    setConfigDialogData({ ...configDialogData, open: false });
  }

  function saveConfigChanges(data) {
    switch (data.nodeType) {
      case "Extension":
        setNodes(
          produce(reactFlowInstance.getNodes(), (draft) => {
            draft[data.nodeIndex].data.name = data.name;
          })
        );
        break;
      case "Condition":
        setNodes(
          produce(reactFlowInstance.getNodes(), (draft) => {
            draft[data.nodeIndex].data.name = data.name;
            draft[data.nodeIndex].data.logic = data.logic;
            draft[data.nodeIndex].data.logicType = data.logicType;
          })
        );
        break;
      case "Action":
        setNodes(
          produce(reactFlowInstance.getNodes(), (draft) => {
            draft[data.nodeIndex].data.name = data.name;
            draft[data.nodeIndex].data.actions = data.actions;
          })
        );
        break;
      default:
        closeConfig();
    }
    closeConfig();
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <AppBarAndNodesDrawer
          export={() => {
            console.log("nodes : ", nodes);
            console.log("edgfes : ", edges);
          }}
        />
        <Configuration
          open={configDialogData.open}
          close={closeConfig}
          data={configDialogData}
          save={saveConfigChanges}
        />
        <Container disableGutters maxWidth={false}>
          <ReactFlowProvider>
            <div
              ref={reactFlowWrapper}
              style={{ height: "100vh", width: "100vw", paddingTop: "64px" }}
            >
              <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                deleteKeyCode="Delete"
                selectionKeyCode="Shift"
                multiSelectionKeyCode={"Control"}
                onlyRenderVisibleElements={true}
              >
                <Controls />
              </ReactFlow>
            </div>
          </ReactFlowProvider>
        </Container>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
