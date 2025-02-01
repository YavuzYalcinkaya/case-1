import React, { useState } from "react";
import { useTeamContext } from "../context/TeamContext";
import { Card, Button } from "../styled";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const UserForm = () => {
  const { teams, addUser } = useTeamContext();
  const [userName, setUserName] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() && selectedTeam) {
      addUser(selectedTeam, userName);
      setUserName("");
    }
  };

  return (
    <Card>
      <h3>Kullanıcı Ekle</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
        <Select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          displayEmpty
          variant="outlined"
          style={{ minWidth: 120 }}
        >
          <MenuItem value="" disabled>
            Ekip Seç
          </MenuItem>
          {teams.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              {team.name}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Kullanıcı Adı"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          variant="outlined"
        />

        <Button type="submit">Ekle</Button>
      </form>
    </Card>
  );
};

export default UserForm;
