import { useState } from "react";
import { useTeamContext } from "../context/TeamContext";
import { Card, Button } from "../styled";
import TextField from "@mui/material/TextField";

const TeamForm = () => {
  const { addTeam, teams } = useTeamContext();
  const [teamName, setTeamName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim()) {
      addTeam(teamName);
      setTeamName("");
    }
  };

  return (
    <Card>
      <h2>Ekip Yönetimi</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
        <TextField
          label="Ekip Adı"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          variant="outlined"
        />
        <Button type="submit">Ekle</Button>
      </form>

      <h3>Mevcut Ekipler:</h3>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </Card>
  );
};

export default TeamForm;
