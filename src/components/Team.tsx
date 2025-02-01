import { useState } from "react";
import { useTeamContext } from "../context/TeamContext";
import { Card, Button } from "../styled";
import { Box } from "@mui/material";

const Team = ({ teamId, name }: { teamId: string; name: string }) => {
  const { removeTeam, teams } = useTeamContext();
  const [showUsers, setShowUsers] = useState(true);

  const team = teams.find((t) => t.id === teamId);

  return (
    <Card>
      <h2>{name}</h2>
      <Box display="flex" gap="10px">
        <Button onClick={() => setShowUsers(!showUsers)}>
          {showUsers ? "Kullanıcıları Gizle" : "Kullanıcıları Göster"}
        </Button>

        <Button
          onClick={() => removeTeam(teamId)}
          style={{ background: "#E53E3E" }}
        >
          Sil
        </Button>
      </Box>

      {showUsers && (
        <>
          <h3>Kullanıcılar:</h3>
          <ul>
            {team?.users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </>
      )}
    </Card>
  );
};

export default Team;
