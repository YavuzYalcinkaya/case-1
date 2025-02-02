import React, { useState } from "react";
import { useTeamContext } from "../context/TeamContext";
import { Card, AddButton } from "../styled";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  List,
  ListItem,
  Checkbox,
  Typography,
  Box,
  FormHelperText,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const UserForm = () => {
  const { teams, addUser, removeUser } = useTeamContext();
  const [userName, setUserName] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<
    { teamId: string; userId: string }[]
  >([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorMessageUsers, setErrorMessageUsers] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    setErrorMessageUsers(null);

    if (!selectedTeam) {
      setErrorMessage("Ekip seçiniz!");
      return;
    }
    if (!userName) {
      setErrorMessageUsers("Kullanıcı seçiniz!");
      return;
    }
    if (userName.trim() && selectedTeam) {
      addUser(selectedTeam, userName);
      setUserName("");
      setCurrentPage(1);
    }
  };

  const handleCheckboxChange = (teamId: string, userId: string) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.some((u) => u.userId === userId)
        ? prevSelected.filter((u) => u.userId !== userId)
        : [...prevSelected, { teamId, userId }]
    );
  };

  const handleBulkDelete = () => {
    selectedUsers.forEach(({ teamId, userId }) => removeUser(teamId, userId));
    setSelectedUsers([]);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(
    teams.flatMap((team) => team.users).length / itemsPerPage
  );
  const paginatedUsers = teams
    .flatMap((team) => team.users)
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Card>
      <Typography variant="h5" gutterBottom>
        Kullanıcı Ekle
      </Typography>

      {/* Kullanıcı Ekleme Formu */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        gap="10px"
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          displayEmpty
          variant="outlined"
          sx={{ minWidth: 150 }}
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
        {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}

        <TextField
          label="Kullanıcı Adı"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          variant="outlined"
          fullWidth
        />
        {errorMessageUsers && (
          <FormHelperText error>{errorMessageUsers}</FormHelperText>
        )}
        <AddButton type="submit">Ekle</AddButton>
      </Box>

      {/* Kullanıcı Listesi */}
      {teams.some((team) => team.users.length > 0) && (
        <>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Mevcut Kullanıcılar:
          </Typography>
          <List
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, // Mobilde 1 sütun, desktop'ta 2 sütun
              gap: 2,
              width: "100%",
            }}
          >
            {teams.flatMap((team) =>
              paginatedUsers.map((user) => (
                <ListItem
                  key={user.id}
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
                      checked={selectedUsers.some((u) => u.userId === user.id)}
                      onChange={() => handleCheckboxChange(team.id, user.id)}
                    />
                    <Typography>
                      {user.name} ({team.name})
                    </Typography>
                  </Box>
                </ListItem>
              ))
            )}
          </List>
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            gap={2}
            sx={{ marginTop: 2 }}
          >
            {selectedUsers.length > 0 && (
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

export default UserForm;
