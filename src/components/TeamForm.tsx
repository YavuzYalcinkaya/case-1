import { useState } from "react";
import { useTeamContext } from "../context/TeamContext";

const TeamForm = () => {
  const { addTeam } = useTeamContext();
  const [teamName, setTeamName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim()) {
      addTeam(teamName);
      setTeamName("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Ekip Adı" />
      <button type="submit">Ekip Ekle</button>
    </form>
  );
};

export default TeamForm;
