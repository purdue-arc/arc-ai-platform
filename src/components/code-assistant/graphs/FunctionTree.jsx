import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Autocomplete,
  TextField,
  Button,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { GraphCanvas } from "reagraph";
import "./FunctionTree.css"; // Assuming your styles are defined here

const Theme = {
  canvas: { background: "#fff" },
  node: {
    fill: "#7CA0AB",
    activeFill: "#1DE9AC",
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.2,
    label: {
      color: "#2A6475",
      stroke: "#fff",
      activeColor: "#1DE9AC",
    },
    subLabel: {
      color: "#ddd",
      stroke: "transparent",
      activeColor: "#1DE9AC",
    },
  },
  lasso: {
    border: "1px solid #55aaff",
    background: "rgba(75, 160, 255, 0.1)",
  },
  ring: {
    fill: "#D8E6EA",
    activeFill: "#1DE9AC",
  },
  edge: {
    fill: "#D8E6EA",
    activeFill: "#1DE9AC",
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.1,
    label: {
      stroke: "#fff",
      color: "#2A6475",
      activeColor: "#1DE9AC",
      fontSize: 6,
    },
  },
  arrow: {
    fill: "#D8E6EA",
    activeFill: "#1DE9AC",
  },
  cluster: {
    stroke: "#D8E6EA",
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.1,
    label: {
      stroke: "#fff",
      color: "#2A6475",
    },
  },
};

function CanvasLayer({ nodes, edges }) {
  return (
    <GraphCanvas
      theme={Theme}
      sizingType="centrality"
      width="100%" // Update to occupy full width
      height="100%" // Update to occupy full height
      nodes={nodes}
      edges={edges}
      nodeSize={20}
      nodeShape="circle"
      edgeWidth={2}
      edgeArrow={true}
      edgeArrowPosition={"mid"}
      edgeArrowColor="gray"
      onNodeClick={(nodeId) => console.log(`Clicked on node ${nodeId}`)}
      onEdgeClick={(edgeId) => console.log(`Clicked on edge ${edgeId}`)}
    />
  );
}
class SeededRNG {
  constructor(seed) {
    this.seed = seed;
  }

  random() {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }
}

const generateNodes = (count, rng) => {
  let nodes = [];
  for (let i = 1; i <= count; i++) {
    nodes.push({
      id: `n-${i}`,
      label: `Node ${i}`,
      color: `hsl(${rng.random() * 360}, 70%, 50%)`, // Generate a color hue for variation
    });
  }
  return nodes;
};

const generateEdges = (nodes, rng) => {
  let edges = [];
  nodes.forEach((sourceNode, index) => {
    // To ensure a valid graph, connect each node with at least one other node
    const targetIndex = (index + 1) % nodes.length;
    const targetNode = nodes[targetIndex];
    edges.push({
      id: `${sourceNode.id}->${targetNode.id}`,
      source: sourceNode.id,
      target: targetNode.id,
      label: `Edge ${sourceNode.label}-${targetNode.label}`,
      color: "gray",
    });

    // Optionally add more edges randomly
    nodes.forEach((targetNode) => {
      if (sourceNode.id !== targetNode.id && rng.random() > 0.9) {
        // Adjust the threshold as needed
        edges.push({
          id: `${sourceNode.id}->${targetNode.id}`,
          source: sourceNode.id,
          target: targetNode.id,
          label: `Edge ${sourceNode.label}-${targetNode.label}`,
          color: "gray",
        });
      }
    });
  });
  return edges;
};

const FunctionTree = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const seed = 12345; // Fixed seed ensures reproducibility
    const rng = new SeededRNG(seed);
    const nodeCount = 50; // Specify the number of nodes you want
    const generatedNodes = generateNodes(nodeCount, rng);
    const generatedEdges = generateEdges(generatedNodes, rng);
    setNodes(generatedNodes);
    setEdges(generatedEdges);

    // Ensure nodes and edges state are updated before calculating degrees
    setTimeout(() => {
      const nodeDegrees = generatedEdges.reduce((acc, edge) => {
        acc[edge.source] = (acc[edge.source] || 0) + 1;
        acc[edge.target] = (acc[edge.target] || 0) + 1;
        return acc;
      }, {});

      let maxDegreeNode = null;
      let maxDegree = 0;
      generatedNodes.forEach((node) => {
        const degree = nodeDegrees[node.id] || 0;
        if (
          degree > maxDegree ||
          (degree === maxDegree &&
            (maxDegreeNode === null || node.id < maxDegreeNode.id))
        ) {
          maxDegreeNode = node;
          maxDegree = degree;
        }
      });

      if (maxDegreeNode) {
        console.log("Node with the highest degree:", maxDegreeNode);
        filterGraph(maxDegreeNode.label);
      }
    }, 0);
  }, []);
  const [filteredNodes, setFilteredNodes] = useState(nodes);
  const [filteredEdges, setFilteredEdges] = useState(edges);
  const filterGraph = (searchTerm) => {
    // Assuming searchTerm is the label or a part of it, and we're doing a case-insensitive search.
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Filter nodes based on the search term being in the label.
    const newFilteredNodes = nodes.filter((node) =>
      node.label.toLowerCase().includes(lowerCaseSearchTerm),
    );

    // Filter edges to include only those that connect to the filtered nodes.
    const newFilteredEdges = edges.filter((edge) =>
      newFilteredNodes.some(
        (node) => node.id === edge.source || node.id === edge.target,
      ),
    );

    // Update the states with the filtered results.
    setFilteredNodes(newFilteredNodes);
    setFilteredEdges(newFilteredEdges);
  };
  const handleSearch = (event, newValue) => {
    const searchTerm = newValue ? newValue.label : "";
    setSearchTerm(searchTerm);
    filterGraph(searchTerm);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        width: "100vw",
        background: "#121212",
      }}
    >
      {/* Added a dark background */}
      <AppBar position="static" sx={{ background: "#333" }}>
        {/* Darker AppBar */}
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => navigate("/code-assistant")}
            sx={{ marginRight: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#FFF" }}
          >
            Code Assistant Report
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          height: "calc(100vh - 64px)",
          padding: "20px",
          display: "flex",
          alignItems: "stretch",
          gap: "20px",
          overflow: "hidden",
        }}
      >
        {/* Search Box Container */}
        <Box
          sx={{
            width: "30vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingRight: "20px", // Add some right padding
          }}
        >
          <Autocomplete
            id="node-search"
            freeSolo
            options={nodes}
            getOptionLabel={(option) => option.label}
            sx={{ width: "100%", background: "#222", borderRadius: 1 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Node"
                variant="filled" // Use the filled variant for a modern look
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                InputProps={{
                  ...params.InputProps,
                  style: { color: "#fff" },
                }}
                sx={{
                  input: { color: "#fff" }, // Ensures the text color is white
                  "& .MuiFilledInput-underline:before": {
                    borderBottomColor: "rgba(255,255,255,0.7)",
                  }, // Underline color
                  "& .MuiFilledInput-underline:hover:before": {
                    borderBottomColor: "#fff",
                  }, // Hover underline color
                  "& .MuiFilledInput-underline:after": {
                    borderBottomColor: "#1DE9AC",
                  }, // Underline color after focusing
                }}
              />
            )}
            onChange={handleSearch}
          />
        </Box>

        {/* Graph Container */}
        <Box
          sx={{
            height: "auto",
            flexGrow: 1,
            width: "60vw", // Adjusted width considering the gap
            overflow: "hidden",
            backgroundColor: "#fff", // Ensure graph background contrasts with dark mode
            borderRadius: "12px", // Rounded corners for the graph container
            boxShadow: "0 4px 24px rgba(0,0,0,0.25)", // Subtle shadow for depth
          }}
        >
          <div
            className="function-tree-container"
            style={{ height: "100%", width: "100%" }}
          >
            <GraphCanvas nodes={filteredNodes} edges={filteredEdges} />
          </div>
        </Box>
      </Container>
    </Box>
  );
};

export default FunctionTree;
