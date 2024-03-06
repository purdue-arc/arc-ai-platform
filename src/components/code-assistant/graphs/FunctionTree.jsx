// FunctionTree.jsx
import React from 'react';
import { GraphCanvas } from 'reagraph';
import './FunctionTree.css'; // Import your CSS file for styling

const FunctionTree = () => (
  <div className="function-tree-container"> {/* Apply styles using CSS class */}
    <GraphCanvas
      width={800} // Set the width of the canvas
      height={600} // Set the height of the canvas
      nodes={[
        { id: 'n-1', label: 'Node 1', color: 'red' }, // Define nodes with id, label, and color
        { id: 'n-2', label: 'Node 2', color: 'blue' },
        { id: 'n-3', label: 'Node 3', color: 'green' }
      ]}
      edges={[
        { id: '1->2', source: 'n-1', target: 'n-2', label: 'Edge 1-2', color: 'black' }, // Define edges with id, source, target, label, and color
        { id: '2->3', source: 'n-2', target: 'n-3', label: 'Edge 2-3', color: 'gray' }
      ]}
      nodeSize={20} // Set the size of the nodes
      nodeShape="circle" // Set the shape of the nodes
      edgeWidth={2} // Set the width of the edges
      edgeArrow={true} // Enable arrowheads on the edges
      edgeArrowPosition={0.5} // Set the position of the arrowheads on the edges
      edgeArrowColor="gray" // Set the color of the arrowheads on the edges
      onNodeClick={(nodeId) => console.log(`Clicked on node ${nodeId}`)} // Handle node click event
      onEdgeClick={(edgeId) => console.log(`Clicked on edge ${edgeId}`)} // Handle edge click event
    />
  </div>
);

export default FunctionTree;
