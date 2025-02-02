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
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TeamForm = () => {
  const { addTeam, removeTeam, teams } = useTeamContext();
  const [teamName, setTeamName] = useState("");
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim()) {
      addTeam(teamName);
      setTeamName("");
      setCurrentPage(1);
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
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(teams.length / itemsPerPage);
  const paginatedTeams = teams.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card>
      <Typography variant="h5" color="secondary" gutterBottom>
        Ekip Yönetimi
      </Typography>

      {/* Ekip Ekleme Formu */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
      >
        <TextField
          label="Ekip Adı"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <AddButton type="submit">Ekle</AddButton>
      </Box>

      {teams.length > 0 && (
        <>
          <Typography variant="h6" color="secondary" sx={{ marginTop: 2 }}>
            Mevcut Ekipler:
          </Typography>
          <List
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, // Mobilde 1 sütun, desktop'ta 2 sütun
              gap: 2,
              width: "100%",
            }}
          >
            {paginatedTeams.map((team) => (
              <ListItem
                key={team.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                  background: "#f9f9f9",
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Checkbox
                    checked={selectedTeams.includes(team.id)}
                    onChange={() => handleCheckboxChange(team.id)}
                  />
                  <Typography>{team.name}</Typography>
                </Box>
              </ListItem>
            ))}
          </List>
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            gap={2}
            sx={{ marginTop: 2 }}
          >
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
            <Box sx={{ marginLeft: "auto" }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, value) => setCurrentPage(value)}
                color="primary"
              />
            </Box>
          </Box>
        </>
      )}
    </Card>
  );
};

export default TeamForm;
