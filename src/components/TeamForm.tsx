import { useState } from "react";
import { useTeamContext } from "../context/TeamContext";
import { Card, AddButton } from "../styled";
import {
  Button,
  TextField,
  Box,
  List,
  ListItem,
  Checkbox,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
      <Typography variant="h5" color="secondary" gutterBottom>
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
        <AddButton type="submit">Ekle</AddButton>
      </Box>

      {/* Mevcut Ekipler Listesi */}
      {teams.length > 0 && (
        <>
          <Typography variant="h6" color="secondary" sx={{ marginTop: 2 }}>
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
              variant="contained"
              color="error"
              onClick={handleBulkDelete}
              startIcon={<DeleteIcon />}
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
