import React, { useState } from "react";

const App = () => {
  const [nodeType, setNodeType] = useState("single");
  const [nodeValue, setNodeValue] = useState("");
  const [nodes, setNodes] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setNodeType(value);
  };

  const addToNode = () => {
    if (nodeType === "single") 
    {
      setNodes([{ type: nodeType, value: nodeValue, children: [] }]);
    } 
    else if (nodeType === "parent") 
    {
      setNodes([{ type: nodeType, value: nodeValue, children: [] }]);
    } 
    else if (nodeType === "child") 
    {
      if (nodes.length > 0) 
      {
        const updatedNodes = [...nodes];
        const lastNode = updatedNodes[updatedNodes.length - 1];
        if (lastNode) 
        {
          lastNode.children.push({ type: nodeType, value: nodeValue, children: [] });
        }

        setNodes(updatedNodes);
      } 
      else {
        alert("You need to create a parent node first.");
      }
    }
    setNodeValue("");
  };

  const renderNodes = (nodeList) => {
    return (
      <ul>
        {nodeList.map((node, index) => (
          <li key={index}>
            <div className="node">
              <span className="circle-bullet">{node.type}</span>
              {node.value && <span className="node-value">: {node.value}</span>}
              {node.children.length > 0 && renderNodes(node.children)}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div>
        <label htmlFor="type">Node type: </label>
        <select onChange={handleChange} value={nodeType}>
          <option value="single">Single</option>
          <option value="parent">Parent</option>
          <option value="child">Child</option>
        </select>

        <label>Node Value: </label>
        <input type="text" placeholder="Node Value" name="nodevalue" onChange={(e) => setNodeValue(e.target.value)} value={nodeValue} />

        <button type="submit" onClick={addToNode}>
          Add Node
        </button>

        <div>{renderNodes(nodes)}</div>
      </div>
    </>
  );
};

export default App;
