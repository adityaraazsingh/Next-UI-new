// "use client"

// import React, { useCallback } from 'react';
// import {
//   ReactFlow,
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   Connection,
//   Edge,
//   Node,
// } from '@xyflow/react';

// const initialNodes: Node[] = [
//   { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
//   { id: '2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
// ];
// import '@xyflow/react/dist/style.css';


// const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

// const ReactFlowComponent: React.FC = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

//   const onConnect = useCallback(
//     (params: Connection) => setEdges((eds) => addEdge(params, eds)),
//     [setEdges]
//   );

//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//       >
//         <Controls />
//         <MiniMap />
//         <Background  gap={12} size={1} />
        
//       </ReactFlow>
//     </div>
//   );
// };

// export default ReactFlowComponent;


//code 2
"use client";

import React, { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
 // Import React Flow styles

// Initial nodes and edges
const initialNodes: Node[] = [
  { id: "1", position: { x: 250, y: 0 }, data: { label: "Start Node" } },
  { id: "2", position: { x: 250, y: 100 }, data: { label: "End Node" } },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
];

const FlowChart: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Handles connecting nodes
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Function to add a new node
  const addNode = () => {
    const newNode: Node = {
      id: (nodes.length + 1).toString(),
      position: {
        x: Math.random() * 400 + 50, // Random position
        y: Math.random() * 400 + 50,
      },
      data: { label: `Node ${nodes.length + 1}` },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <button
        onClick={addNode}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 10,
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Node
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background gap={15} size={0.5} />
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
