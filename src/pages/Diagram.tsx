import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTeamContext } from "../context/TeamContext";

const Diagram = () => {
  const { teams } = useTeamContext();

  const nodes: Node[] = teams.flatMap((team, index) => [
    {
      id: team.id,
      type: "default",
      data: { label: team.name },
      position: { x: 100, y: index * 200 },
      style: { backgroundColor: "#4F46E5", color: "white" },
    },
    ...team.users.map((user, userIndex) => ({
      id: user.id,
      type: "default",
      data: { label: user.name },
      position: { x: 300, y: index * 200 + userIndex * 50 },
      style: { backgroundColor: "#14B8A6", color: "white" },
    })),
  ]);

  const edges: Edge[] = teams.flatMap((team) =>
    team.users.map((user) => ({
      id: `edge-${user.id}`,
      source: team.id,
      target: user.id,
      animated: true,
    }))
  );

  return (
    <div style={{ width: "100%", height: "80vh" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Controls />
        <Background />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default Diagram;
