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
      id: "-1",
      type: "Start",
      draggable: false,
      selectable: false,
      position: { x: 25, y: 25 },
      data: { outputHID: "-1" },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [configDialogData, setConfigDialogData] = useState({ open: false });

  const [nodeIdCounter, setNodeIdCounter] = useState(0);
  const [edgeIdCounter, setEdgeIdCounter] = useState(0);
  const [handleIdCounter, setHandleIdCounter] = useState(0);

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
      let tempHandleIdCounter = handleIdCounter;
      let node = {
        id: nodeIdCounter.toString(),
        type,
        position,
        dragHandle: ".custom-drag-handle",
        selectable: true,
        data: {
          name: "",
          inputHID: (++tempHandleIdCounter).toString(),
          openConfig: openConfig,
        },
      };
      setNodeIdCounter(nodeIdCounter + 1);

      switch (type) {
        case "Extension":
          node = {
            ...node,
            data: {
              ...node.data,
              extensionContentHID: (++tempHandleIdCounter).toString(),
              nextExtensionHID: (++tempHandleIdCounter).toString(),
            },
          };
          setHandleIdCounter(tempHandleIdCounter);
          break;
        case "Condition":
          node = {
            ...node,
            data: {
              ...node.data,
              logic: {
                type: "single",
                conditions: [{ type: "", field: "", expression: "" }],
              },
              actionsHID: (++tempHandleIdCounter).toString(),
              antiActionsHID: (++tempHandleIdCounter).toString(),
              noMatchHID: (++tempHandleIdCounter).toString(),
            },
          };
          setHandleIdCounter(tempHandleIdCounter);
          break;
        case "Action":
          node = {
            ...node,
            data: {
              ...node.data,
              actions: [{ type: "", application: "", data: "" }],
              outputHID: (++tempHandleIdCounter).toString(),
            },
          };
          setHandleIdCounter(tempHandleIdCounter);
          break;
        default:
          break;
      }
      setNodes((nodes) => nodes.concat(node));
    },
    [nodeIdCounter, openConfig, reactFlowInstance, setNodes, edges]
  );

  // trigger on nodes connection
  const onConnect = useCallback(
    (params) => {
      console.log(params);

      if (
        edges.find((edge) => params.sourceHandle === edge.sourceHandle) != null
      ) {
        console.warn("Handle is already conencted with an edge");
        return;
      }

      const source = nodes.find((node) => node.id === params.source);
      const target = nodes.find((node) => node.id === params.target);

      if (source.type === "Start" && target.type !== "Extension") return;
      else if (source.type === "Extension") {
        if (source.data.extensionContentHID === params.sourceHandle) {
          if (target.type === "Extension") {
            console.warn(
              "Cannot Connect Content of Extension to another Extension, try a Condition or an Action"
            );
            return;
          }
        } else if (source.data.nextExtensionHID === params.sourceHandle) {
          if (target.type !== "Extension") {
            console.warn(
              "Cannot conenct Next extension handle to aanything other that an Extension Node"
            );
            return;
          }
        }
      }

      setEdges((edges) =>
        addEdge(
          {
            ...params,
            id: edgeIdCounter.toString(),
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
      setEdgeIdCounter(edgeIdCounter + 1);
    },
    [edges, edgeIdCounter, nodes]
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
            let temp = {
              nodes: nodes,
              edges: edges,
              nodeIdCounter: nodeIdCounter,
              edgeIdCounter: edgeIdCounter,
              handleIdCounter: handleIdCounter,
            };
            console.log("EXPORT : ", JSON.stringify(temp, null, "\t"));
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
                snapToGrid={true}
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
