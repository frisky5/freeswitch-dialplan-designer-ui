import React, { useCallback, useRef, useState } from "react";
import { Container, CssBaseline, LinearProgress } from "@mui/material";
import produce from "immer";

import ReactFlow, {
  addEdge,
  Controls,
  MarkerType,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import 'reactflow/dist/style.css';

import { v4 as uuidv4 } from "uuid";
import Delete from "./components/dialogs/Delete";
import "./index.css";
import Action from "./nodes/Action";
import SingleCondition from "./nodes/SingleCondtion";
import Extension from "./nodes/Extension";
import IvrMenu from "./nodes/IvrMenu";
import Start from "./nodes/Start";
import Configuration from "./components/dialogs/Configuration";
import AppBarAndNodesDrawer from "./components/AppBarAndNodesDrawer";

const nodeTypes = {
  start: Start,
  extension: Extension,
  singleCondition: SingleCondition,
  action: Action,
  ivrMenu: IvrMenu,
};


function App() {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      //first node in any dialplan flow, do not modify this
      id: uuidv4(),
      type: "start",
      draggable: false,
      selectable: false,
      position: { x: 15, y: 20 },
      data: { handleId: uuidv4() },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [deleteTargetId, setDeleteTargetId] = useState("");
  const [deleteType, setDeleteType] = useState("")
  const [openDeletConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [openConfigDialog, setOpenConfigDialog] = useState(false);
  const [configDialogData, setConfigDialogData] = useState({ open: false })

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
          inputHandleId: uuidv4(),
          openConfig: openConfig,
          openDeleteNode: openDeleteNode,
        },
      };

      switch (type) {
        case "extension":
          node = {
            ...node,
            data: {
              ...node.data,
              name: "",
              extensionContentHandleId: uuidv4(),
              nextExtensionHandleId: uuidv4(),
            },
          };
          break;

        case "singleCondition":
          node = {
            ...node,
            data: {
              ...node.data,
              field: "",
              expression: "",
              matchHandleId: uuidv4(),
              noMatchHandleId: uuidv4(),
            },
          };
          break;

        case "action":
          node = {
            ...node,
            data: {
              ...node.data,
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
      setNodes((nds) => nds.concat(node));
    },
    [reactFlowInstance, setNodes]
  );

  // trigger on nodes connection
  const onConnect = useCallback((params) => {
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          id: uuidv4(),
          type: "smoothstep",

          data: {
            askDeleteEdge: askDeleteEdge,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "black",
            height: 20,
            width: 50,
          },
        },
        eds
      )
    );
  }, [setEdges]);

  //Node and Edges Deletion
  const openDeleteNode = (id) => {
    setDeleteType("node");
    setDeleteTargetId(id);
    setOpenDeleteConfirmation(true);
  };

  const deleteNode = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    //delete related edges to avoid zombie edges
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== id && edge.target !== id)
    );
  };

  const askDeleteEdge = (edgeId) => {
    setDeleteType("edge");
    setDeleteTargetId(edgeId);
    setOpenDeleteConfirmation(true);
  };

  const deleteEdge = (id) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
  };


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
      nodeData: reactFlowInstance.getNodes()[indexOfNode].data
    })
  }

  function saveConfigChanges(data) {
    console.log(data)
    switch (data.nodeType) {
      case "extension":
        setNodes(
          produce(reactFlowInstance.getNodes(), (draft) => {
            draft[data.nodeIndex].data.name = data.name;
          })
        );
        setConfigDialogData({ open: false })
        return;
      case "condition":
        setNodes(
          produce(reactFlowInstance.getNodes(), (draft) => {
            draft[data.nodeIndex].data.field = data.field;
            draft[data.nodeIndex].data.expression = data.expression;
          })
        );
        setConfigDialogData({ open: false })
        return;
      default:
        setConfigDialogData({ open: false })
    }
  }

  const saveConditionNodeChanges = (data) => {
    setNodes(
      produce(reactFlowInstance.getNodes(), (draft) => {
        draft[configDialogData.nodeIndex].data.name = data.name;
        draft[configDialogData.nodeIndex].data.logic = data.logic;
      })
    );
  };

  const saveActionNodeChanges = (data) => {
    setNodes(
      produce(reactFlowInstance.getNodes(), (draft) => {
        draft[configDialogData.nodeIndex].data.name = data.name;
      })
    );
  };

  return (
    <Container disableGutters maxWidth={false}>
      <Delete
        id={deleteTargetId}
        deleteType={deleteType}
        open={openDeletConfirmation}
        yes={() => {
          switch (deleteType) {
            case "node":
              deleteNode(deleteTargetId);
              break;
            case "edge":
              deleteEdge(deleteTargetId);
              break;
            default:
              break;
          }
          setOpenDeleteConfirmation(false);
          if (openConfigDialog) setOpenConfigDialog(false);
        }}
        no={() => {
          setOpenDeleteConfirmation(false);
        }}
      />
      <Configuration
        open={configDialogData.open}
        close={() => {
          setConfigDialogData({ open: false })
        }}
        data={configDialogData}
        save={saveConfigChanges}
        saveConditionNodeChanges={saveConditionNodeChanges}
      />

      <ReactFlowProvider>
        <div
          ref={reactFlowWrapper}
          style={{ height: "100vh", width: '100vw', paddingTop: "64px" }}
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
          >
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      <AppBarAndNodesDrawer />
    </Container>
  );
}

export default App;
