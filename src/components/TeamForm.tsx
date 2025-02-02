import { useState } from "react";
import { useTeamContext } from "../context/TeamContext";
import { Card, Button } from "../styled";
import {
  TextField,
  Box,
  List,
  ListItem,
  Checkbox,
  Typography,
} from "@mui/material";

const TeamForm = () => {
  const { addTeam, removeTeam, teams } = useTeamContext();
  const [teamName, setTeamName] = useState("");
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim()) {
      addTeam(teamName);
      setTeamName("");
    }
  };

  const handleCheckboxChange = (teamId: string) => {
    setSelectedTeams((prevSelected) =>
      prevSelected.includes(teamId)
        ? prevSelected.filter((id) => id !== teamId)
        : [...prevSelected, teamId]
    );
  };

  const handleBulkDelete = () => {
    selectedTeams.forEach((teamId) => removeTeam(teamId));
    setSelectedTeams([]);
  };

  return (
    <Card>
      <Typography variant="h5" gutterBottom>
        Ekip Yönetimi
      </Typography>

      {/* Ekip Ekleme Formu */}
      <Box component="form" onSubmit={handleSubmit} display="flex" gap="10px">
        <TextField
          label="Ekip Adı"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button type="submit">Ekle</Button>
      </Box>

      {/* Mevcut Ekipler Listesi */}
      {teams.length > 0 && (
        <>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Mevcut Ekipler:
          </Typography>
          <List>
            {teams.map((team) => (
              <ListItem
                key={team.id}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Checkbox
                  checked={selectedTeams.includes(team.id)}
                  onChange={() => handleCheckboxChange(team.id)}
                />
                <Typography>{team.name}</Typography>
              </ListItem>
            ))}
          </List>

          {/* Seçili Ekipleri Sil Butonu */}
          {selectedTeams.length > 0 && (
            <Button
              onClick={handleBulkDelete}
              style={{ background: "#E53E3E", marginTop: "10px" }}
            >
              Seçilenleri Sil
            </Button>
          )}
        </>
      )}
    </Card>
  );
};

export default TeamForm;
